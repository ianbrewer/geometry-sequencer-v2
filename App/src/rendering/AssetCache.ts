import { Assets, Texture } from 'pixi.js';
import { recolorSvg, type SvgRecolorOptions } from '../utils/svgRecolor';

type LoadInfo = { url: string; mimeType: string };
type UrlProvider = (assetId: string) => Promise<LoadInfo | null>;
export type AssetEntry = { id: string; mimeType: string };
type FolderAssetsProvider = (folderId: string | null) => AssetEntry[];

// Rasterization factor for SVGs. Pixi v8 otherwise rasterizes SVGs at their
// natural (viewBox) size, which pixelates when the sprite is scaled up.
// 4x yields ~480px textures for our 120px seed viewBoxes — crisp at typical
// on-screen sizes and light enough to batch smoothly across many instances.
const SVG_RASTER_RESOLUTION = 4;

class AssetCacheImpl {
    private textures = new Map<string, Texture>();
    private inflight = new Map<string, Promise<Texture | null>>();
    private svgSources = new Map<string, string>();
    private urlProvider: UrlProvider | null = null;
    private folderAssetsProvider: FolderAssetsProvider | null = null;

    setUrlProvider(p: UrlProvider | null) {
        this.urlProvider = p;
    }

    setFolderAssetsProvider(p: FolderAssetsProvider | null) {
        this.folderAssetsProvider = p;
    }

    getAssetsInFolder(folderId: string | null): AssetEntry[] {
        return this.folderAssetsProvider ? this.folderAssetsProvider(folderId) : [];
    }

    // Synchronous — returns the cached Texture or null. Kicks off a load if not yet started.
    // Callers are expected to run every frame, so `null` on the first hit becomes the real
    // Texture on a subsequent frame.
    //
    // If `colorKey` is a non-empty string, returns a recolored variant of the asset (SVG only).
    // The variant is rasterized lazily on first request and cached under `${assetId}|${colorKey}`.
    getTextureSync(assetId: string, colorKey?: string, recolorOpts?: SvgRecolorOptions): Texture | null {
        const key = colorKey ? `${assetId}|${colorKey}` : assetId;
        const cached = this.textures.get(key);
        if (cached) return cached;
        if (!this.inflight.has(key) && this.urlProvider) {
            if (colorKey && recolorOpts) {
                // Variant requires the base SVG source. If we don't have it yet, ensure
                // the base load kicks off; the variant will be requested again next frame.
                if (!this.svgSources.has(assetId)) {
                    if (!this.inflight.has(assetId)) {
                        this.inflight.set(assetId, this.load(assetId));
                    }
                    return null;
                }
                this.inflight.set(key, this.loadVariant(assetId, key, recolorOpts));
            } else {
                this.inflight.set(key, this.load(assetId));
            }
        }
        return null;
    }

    private async load(assetId: string): Promise<Texture | null> {
        if (!this.urlProvider) return null;
        try {
            const info = await this.urlProvider(assetId);
            if (!info) return null;
            let tex: Texture;
            if (info.mimeType === 'image/svg+xml') {
                const resp = await fetch(info.url);
                const text = await resp.text();
                this.svgSources.set(assetId, text);
                const dataUrl = svgToDataUrl(text);
                tex = await Assets.load<Texture>({ src: dataUrl, data: { resolution: SVG_RASTER_RESOLUTION } });
            } else {
                tex = await Assets.load<Texture>(info.url);
            }
            this.textures.set(assetId, tex);
            return tex;
        } catch (e) {
            console.error('AssetCache load failed', assetId, e);
            return null;
        } finally {
            this.inflight.delete(assetId);
        }
    }

    private async loadVariant(assetId: string, key: string, opts: SvgRecolorOptions): Promise<Texture | null> {
        try {
            const source = this.svgSources.get(assetId);
            if (!source) return null;
            const recolored = recolorSvg(source, opts);
            const dataUrl = svgToDataUrl(recolored);
            const tex = await Assets.load<Texture>({ src: dataUrl, data: { resolution: SVG_RASTER_RESOLUTION } });
            this.textures.set(key, tex);
            return tex;
        } catch (e) {
            console.error('AssetCache variant load failed', key, e);
            return null;
        } finally {
            this.inflight.delete(key);
        }
    }

    // Returns true if the asset is an SVG (variants supported). False for rasters
    // or assets not yet loaded — caller should fall back to base texture + tint.
    isSvg(assetId: string): boolean {
        return this.svgSources.has(assetId);
    }

    invalidate(assetId: string) {
        for (const [key, tex] of this.textures) {
            if (key === assetId || key.startsWith(`${assetId}|`)) {
                tex.destroy(true);
                this.textures.delete(key);
            }
        }
        this.svgSources.delete(assetId);
    }

    clear() {
        for (const tex of this.textures.values()) tex.destroy(true);
        this.textures.clear();
        this.inflight.clear();
        this.svgSources.clear();
    }
}

function svgToDataUrl(svgText: string): string {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
}

export const assetCache = new AssetCacheImpl();
