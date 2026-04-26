import type { Application } from 'pixi.js';

let appProvider: (() => Application | null) | null = null;

export function setPixiAppProvider(p: (() => Application | null) | null) {
    appProvider = p;
}

export async function captureThumbnail(width = 320, height = 180): Promise<Blob | null> {
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

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    const sw = source.width;
    const sh = source.height;
    if (sw && sh) {
        const scale = Math.min(width / sw, height / sh);
        const dw = sw * scale;
        const dh = sh * scale;
        ctx.drawImage(source, (width - dw) / 2, (height - dh) / 2, dw, dh);
    }

    return new Promise(res => target.toBlob(res, 'image/png'));
}
