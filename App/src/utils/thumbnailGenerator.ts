import type { Application } from 'pixi.js';

let appProvider: (() => Application | null) | null = null;

export function setPixiAppProvider(p: (() => Application | null) | null) {
    appProvider = p;
}

export async function captureThumbnail(
    width = 320,
    height = 180,
    backgroundColor = '#000000',
): Promise<Blob | null> {
    const app = appProvider?.();
    if (!app || !app.renderer) return null;

    let source: HTMLCanvasElement;
    try {
        source = (await app.renderer.extract.canvas(app.stage as any)) as HTMLCanvasElement;
    } catch (e) {
        console.warn('Thumbnail capture failed', e);
        return null;
    }

    const target = document.createElement('canvas');
    target.width = width;
    target.height = height;
    const ctx = target.getContext('2d');
    if (!ctx) return null;

    // Pixi v8's extract.canvas(stage) renders into a fresh transparent target,
    // so the renderer's background color isn't in `source`. Fill the project
    // background here so the thumbnail matches what the user sees on screen.
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const sw = source.width;
    const sh = source.height;
    if (sw && sh) {
        // object-fit: cover. Scale to whichever dimension fills the target,
        // and let the other axis overflow + clip — thumbnail is always 100%
        // filled regardless of source aspect.
        const scale = Math.max(width / sw, height / sh);
        const dw = sw * scale;
        const dh = sh * scale;
        ctx.drawImage(source, (width - dw) / 2, (height - dh) / 2, dw, dh);
    }

    return new Promise(res => target.toBlob(res, 'image/png'));
}
