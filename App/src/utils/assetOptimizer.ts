// Compress user-uploaded assets before they hit Storage.
// SVGs: SVGO (dynamic-imported browser build).
// PNG/JPEG: canvas re-encode with optional downscale.
// Always falls back to the original file if optimization fails or would make it larger.

const RASTER_MAX_DIM = 2048;
const JPEG_QUALITY = 0.85;

export async function optimizeAsset(file: File): Promise<File> {
    try {
        if (file.type === 'image/svg+xml') return await optimizeSvg(file);
        if (file.type === 'image/png' || file.type === 'image/jpeg') return await optimizeRaster(file);
        return file;
    } catch (e) {
        console.warn('Asset optimization failed, using original', e);
        return file;
    }
}

async function optimizeSvg(file: File): Promise<File> {
    const originalText = await file.text();
    const { optimize } = await import('svgo/browser');
    // mergePaths + convertShapeToPath both flatten compound subpaths in ways
    // that drop fill-rule="evenodd" knockouts when we render the result via
    // Pixi's GraphicsContext. Disable them so vector rendering preserves the
    // designer's holes/cutouts. preset-default still applies all the safer
    // size-saving plugins.
    const result = optimize(originalText, {
        multipass: true,
        plugins: [{
            name: 'preset-default',
            params: {
                overrides: {
                    mergePaths: false,
                    convertShapeToPath: false,
                    removeViewBox: false,
                },
            },
        }],
    });
    if (!('data' in result) || typeof result.data !== 'string') return file;
    if (result.data.length >= originalText.length) return file;
    return new File([result.data], file.name, { type: 'image/svg+xml', lastModified: file.lastModified });
}

async function optimizeRaster(file: File): Promise<File> {
    const bitmap = await loadBitmap(file);
    const { width, height } = bitmap;
    const scale = Math.min(1, RASTER_MAX_DIM / Math.max(width, height));
    const targetW = Math.max(1, Math.round(width * scale));
    const targetH = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) { bitmap.close?.(); return file; }
    ctx.drawImage(bitmap, 0, 0, targetW, targetH);
    bitmap.close?.();

    const [mime, quality] = file.type === 'image/jpeg' ? ['image/jpeg', JPEG_QUALITY] : ['image/png', undefined];
    const blob: Blob | null = await new Promise(res => canvas.toBlob(res, mime, quality));
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name, { type: mime, lastModified: file.lastModified });
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
    if (typeof createImageBitmap === 'function') {
        return await createImageBitmap(file);
    }
    // Fallback path for environments without createImageBitmap
    const url = URL.createObjectURL(file);
    try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const el = new Image();
            el.onload = () => resolve(el);
            el.onerror = reject;
            el.src = url;
        });
        return { width: img.width, height: img.height, close: () => {} } as unknown as ImageBitmap;
    } finally {
        URL.revokeObjectURL(url);
    }
}
