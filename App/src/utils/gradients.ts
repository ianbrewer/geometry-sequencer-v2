import { Texture } from 'pixi.js';

const gradientTextureCache = new Map<string, Texture>();

export const createGradientTexture = (stops: { offset: number, color: string }[]) => {
    // Generate a simple 1x256 gradient texture
    // We use a fixed width (256) for the texture quality.
    // The Sprite will be scaled to cover the screen.
    const key = JSON.stringify(stops);
    if (gradientTextureCache.has(key)) return gradientTextureCache.get(key)!;

    const width = 256;
    const height = 1;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return Texture.WHITE;

    const grad = ctx.createLinearGradient(0, 0, width, 0);
    const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);

    sortedStops.forEach(stop => {
        grad.addColorStop(stop.offset / 100, stop.color);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const texture = Texture.from(canvas);
    gradientTextureCache.set(key, texture);
    return texture;
};
