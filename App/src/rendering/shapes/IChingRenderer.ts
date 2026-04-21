import { Graphics, Color } from 'pixi.js';
import type { LayerConfig } from '../../types';
import { drawRotatedRect } from './ShapeUtils';
import { getHexagramConfig } from '../../utils/iching';
import { solveCubicBezier } from '../../utils/interpolation';

export const drawIChingHexagram = (g: Graphics, rx: number, ry: number, layerConfig: LayerConfig, progress: number, strokeColor: Color, fillColor: Color) => {
    const id = layerConfig.ichingInputId || 1;
    const highlightIndex = layerConfig.ichingHighlightIndex || 0;
    const hexagram = getHexagramConfig(id);

    const stackHeight = ry * 2;
    const lineWidth = rx * 2;
    const h = stackHeight / 9;
    const spacing = h * 0.6;
    const totalContentHeight = 6 * h + 5 * spacing;
    const yOffsetStart = totalContentHeight / 2 - h / 2;

    const phaseA_End = 0.3;
    const phaseB_End = 0.7;

    const effectiveFillColor = layerConfig.fillEnabled ? fillColor : (layerConfig.strokeEnabled ? strokeColor : new Color(0xffffff));

    for (let i = 0; i < 6; i++) {
        const lineIndex = i + 1;
        const yPos = yOffsetStart - i * (h + spacing);
        const topY = yPos - h / 2;

        // Phase A: Growth
        let easeWidth = 0;
        if (progress <= phaseA_End) {
            if (progress < 0) easeWidth = 0;
            else {
                const localP = progress / phaseA_End;
                const growthStart = i * 0.12;
                const growthDuration = 0.4;
                const growthP = Math.max(0, Math.min(1, (localP - growthStart) / growthDuration));
                easeWidth = solveCubicBezier(growthP, 0.2, 0.6, 0.35, 1.0);
            }
        } else {
            easeWidth = 1.0;
        }

        const currentW = lineWidth * easeWidth;
        if (currentW <= 0.01) continue;

        // Phase B: Gap Wave
        let gapOpenAmount = 0;
        if (progress > 0.1) {
            const waveGlobalP = Math.max(0, (progress - 0.25) * 2.5);
            if (waveGlobalP > 0) {
                const waveHead = waveGlobalP * 7;
                const dist = waveHead - i;
                if (hexagram[i] && dist > 0) {
                    const linearP = Math.max(0, Math.min(1, dist * 0.4));
                    gapOpenAmount = solveCubicBezier(linearP, 0.1, 2.2, 0.25, 1.0);
                }
            }
        }
        gapOpenAmount = Math.max(0, gapOpenAmount);

        const maxGap = Math.min(lineWidth * 0.3, h * 2);
        let currentGap = maxGap * gapOpenAmount;
        const halfW = currentW / 2;

        if (currentGap < 0.5) {
            g.rect(-halfW, topY, currentW, h);
            g.fill({ color: effectiveFillColor });
        } else {
            const halfG = currentGap / 2;
            const segW = halfW - halfG;
            if (segW > 0) {
                g.rect(-halfW, topY, segW, h);
                g.fill({ color: effectiveFillColor });
                g.rect(halfG, topY, segW, h);
                g.fill({ color: effectiveFillColor });
            }
        }

        // Phase C: Highlight
        if (lineIndex === highlightIndex && progress > phaseB_End) {
            const localP = (progress - phaseB_End) / (1.0 - phaseB_End);
            const popP = Math.min(1, localP * 2.5);
            const popScale = solveCubicBezier(popP, 0.175, 0.885, 0.32, 1.275);
            const slideP = Math.max(0, (localP - 0.4) * 1.66);
            const slideEase = solveCubicBezier(slideP, 0.2, 0.6, 0.35, 1.0);

            const dSize = h / Math.sqrt(2);
            const anchorRight = lineWidth / 2;
            const anchorLeft = -anchorRight;

            if (popP > 0) {
                drawRotatedRect(g, anchorLeft, yPos, dSize * popScale, dSize * popScale, 45, effectiveFillColor);
                drawRotatedRect(g, anchorRight, yPos, dSize * popScale, dSize * popScale, 45, effectiveFillColor);
            }
            if (slideP > 0) {
                const maxOffset = h;
                const offsetDist = maxOffset * slideEase;
                drawRotatedRect(g, anchorLeft - offsetDist, yPos, dSize, dSize, 45, effectiveFillColor);
                drawRotatedRect(g, anchorRight + offsetDist, yPos, dSize, dSize, 45, effectiveFillColor);
            }
        }
    }
};

export const drawIChingLines = (g: Graphics, rx: number, ry: number, layerConfig: LayerConfig, strokeColor: Color, strokeWeight: number) => {
    const id = layerConfig.ichingInputId || 1;
    const hexagram = getHexagramConfig(id);

    // We only draw strokes if stroke is enabled
    if (!layerConfig.strokeEnabled || strokeWeight <= 0) return;

    g.setStrokeStyle({ width: strokeWeight, color: strokeColor, alignment: 0.5, cap: 'round' });

    const lineWidth = rx * 2;
    const halfW = lineWidth / 2;
    const gapSize = lineWidth * 0.3; // size of the empty gap in broken lines

    for (let i = 0; i < 6; i++) {
        // i=0 is bottom (ry), i=5 is top (-ry)
        const t = i / 5;
        const yPos = ry - t * 2 * ry;

        const isBroken = hexagram[i]; // true for broken line (Yin), false for solid (Yang)

        if (!isBroken) {
            // Solid line
            g.moveTo(-halfW, yPos);
            g.lineTo(halfW, yPos);
        } else {
            // Broken line
            const halfGap = gapSize / 2;
            const segW = halfW - halfGap;

            // Left segment
            g.moveTo(-halfW, yPos);
            g.lineTo(-halfW + segW, yPos);

            // Right segment
            g.moveTo(halfGap, yPos);
            g.lineTo(halfGap + segW, yPos);
        }
    }
    g.stroke();
};
