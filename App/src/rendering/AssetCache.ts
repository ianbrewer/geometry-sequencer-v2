import { Assets, Texture } from 'pixi.js';

type UrlProvider = (assetId: string) => Promise<string | null>;
export type AssetEntry = { id: string; mimeType: string };
type FolderAssetsProvider = (folderId: string | null) => AssetEntry[];

class AssetCacheImpl {
    private textures = new Map<string, Texture>();
    private inflight = new Map<string, Promise<Texture | null>>();
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
    getTextureSync(assetId: string): Texture | null {
        const cached = this.textures.get(assetId);
        if (cached) return cached;
        if (!this.inflight.has(assetId) && this.urlProvider) {
            this.inflight.set(assetId, this.load(assetId));
        }
        return null;
    }

    private async load(assetId: string): Promise<Texture | null> {
        if (!this.urlProvider) return null;
        try {
            const url = await this.urlProvider(assetId);
            if (!url) return null;
            const tex = await Assets.load<Texture>(url);
            this.textures.set(assetId, tex);
            return tex;
        } catch (e) {
            console.error('AssetCache load failed', assetId, e);
            return null;
        } finally {
            this.inflight.delete(assetId);
        }
    }

    invalidate(assetId: string) {
        const tex = this.textures.get(assetId);
        if (tex) tex.destroy(true);
        this.textures.delete(assetId);
    }

    clear() {
        for (const tex of this.textures.values()) tex.destroy(true);
        this.textures.clear();
        this.inflight.clear();
    }
}

export const assetCache = new AssetCacheImpl();
