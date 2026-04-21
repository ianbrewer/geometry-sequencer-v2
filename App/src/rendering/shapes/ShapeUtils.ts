import { Graphics, Color } from 'pixi.js';

export const drawRotatedRect = (g: Graphics, x: number, y: number, w: number, h: number, rotationDeg: number, fillColor: Color) => {
    const rad = rotationDeg * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const hw = w / 2;
    const hh = h / 2;
    const points = [{ x: -hw, y: -hh }, { x: hw, y: -hh }, { x: hw, y: hh }, { x: -hw, y: hh }];
    const rotatedPoints = points.map(p => ({
        x: x + (p.x * cos - p.y * sin),
        y: y + (p.x * sin + p.y * cos)
    }));
    g.poly(rotatedPoints.map(p => p.x).flatMap((_, i) => [rotatedPoints[i].x, rotatedPoints[i].y]));
    g.fill({ color: fillColor });
};
