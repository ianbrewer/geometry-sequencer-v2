
import { Graphics, Color, GraphicsPath, Matrix } from 'pixi.js';
import type { ShapeType, LayerConfig } from '../types';
import { getUnitPolygon, getUnitCustomShapes, getUnitStar } from '../utils/geometry';
import { drawIChingHexagram, drawIChingLines } from './shapes/IChingRenderer';
import { drawMolecule } from './shapes/MoleculeRenderer';

import { drawPolyhedron } from './shapes/PolyhedronRenderer';

// Helper to draw a dashed line between two points
const dashLine = (g: Graphics, x1: number, y1: number, x2: number, y2: number, dashLen: number, gapLen: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    let curr = 0;
    while (curr < len) {
        // Start of dash
        const dStart = curr;
        const dEnd = Math.min(len, curr + dashLen);

        g.moveTo(x1 + cos * dStart, y1 + sin * dStart);
        g.lineTo(x1 + cos * dEnd, y1 + sin * dEnd);

        curr += dashLen + gapLen;
    }
};

// Helper to draw a dashed polygon path
const dashPolygon = (g: Graphics, points: { x: number, y: number }[], dashLen: number, gapLen: number, close: boolean) => {
    for (let i = 0; i < points.length; i++) {
        const nextIdx = (i + 1) % points.length;
        if (!close && i === points.length - 1) break;

        const p1 = points[i];
        const p2 = points[nextIdx];
        dashLine(g, p1.x, p1.y, p2.x, p2.y, dashLen, gapLen);
    }
};

// Helper to draw a dashed ellipse/arc/circle
const dashArc = (g: Graphics, cx: number, cy: number, rx: number, ry: number, startAngle: number, endAngle: number, dashLen: number, gapLen: number) => {
    const totalAngle = Math.abs(endAngle - startAngle);
    const avgR = (rx + ry) / 2;
    const curveLen = totalAngle * avgR;

    // Check if dash+gap is too small compared to curve to avoid infinite loops
    const segmentLen = Math.max(0.1, dashLen + gapLen);

    let curr = 0;
    while (curr < curveLen) {
        const sDist = curr;
        const eDist = Math.min(curveLen, curr + dashLen);

        // Convert distances back to angles
        const sAngle = startAngle + (sDist / curveLen) * totalAngle;
        const eAngle = startAngle + (eDist / curveLen) * totalAngle;

        // Draw Arc Segment
        if (Math.abs(rx - ry) < 0.1) {
            g.arc(cx, cy, rx, sAngle, eAngle);
        } else {
            // Manual ellipse segment
            const res = 10;
            for (let k = 0; k <= res; k++) {
                const t = sAngle + (eAngle - sAngle) * (k / res);
                const px = cx + rx * Math.cos(t);
                const py = cy + ry * Math.sin(t);
                if (k === 0) g.moveTo(px, py);
                else g.lineTo(px, py);
            }
        }

        curr += segmentLen;
    }
};

// Helper to draw an elliptical arc
const ellipticalArc = (g: Graphics, cx: number, cy: number, rx: number, ry: number, startAngle: number, endAngle: number) => {
    if (Math.abs(rx - ry) < 0.1) {
        g.arc(cx, cy, rx, startAngle, endAngle);
        return;
    }
    const res = 40; // Resolution for ellipse
    for (let k = 0; k <= res; k++) {
        const t = startAngle + (endAngle - startAngle) * (k / res);
        const px = cx + rx * Math.cos(t);
        const py = cy + ry * Math.sin(t);
        if (k === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
    }
};

export const updatePrimitive = (g: Graphics, type: ShapeType, rx: number, ry: number, sides: number, density: number, layerConfig: LayerConfig, progress: number, currentStrokeWeight: number, currentShapeArc: number = 360, currentStarInnerRadius: number = 0.5, rotateX: number = 0, rotateY: number = 0, currentPerspective: number = 1200) => {
    g.clear();
    const strokeColor = new Color(layerConfig.strokeColor || '#ffffff');
    const fillColor = new Color(layerConfig.fillColor || '#ffffff');

    // Config for Dashing
    // 'dashed' is the universal key for patterned strokes now.
    // 'dotted' legacy fallback: force small dash
    const isDashes = layerConfig.strokeEnabled && (layerConfig.strokeStyleType === 'dashed' || layerConfig.strokeStyleType === 'dotted');

    let dashLen = layerConfig.dashLength || 10;
    const gapLen = layerConfig.gapLength || 10;

    // Fallback if type is legacy 'dotted' but UI hasn't updated config yet
    if (layerConfig.strokeStyleType === 'dotted') {
        dashLen = 0.1; // Force small dash
    }

    const strokeStyle = {
        width: currentStrokeWeight,
        color: strokeColor,
        cap: 'round' as 'round',  // Always round to support nice dots and rounded dashes
        join: 'round' as 'round',
        pixelLine: false
    };

    const applyFill = () => {
        if (layerConfig.fillEnabled) g.fill({ color: fillColor });
    };

    const strokeCurrent = () => {
        if (layerConfig.strokeEnabled) g.stroke(strokeStyle);
    };

    const isDashed = isDashes; // Alias

    switch (type) {
        case 'polygon': {
            const isCustomShape = !!(layerConfig.customPaths?.length || layerConfig.customPath);

            let points: { x: number, y: number }[] = [];

            if (isCustomShape) {
                const pathDatas = layerConfig.customPaths?.length ? layerConfig.customPaths : [layerConfig.customPath].filter(Boolean) as string[];

                // Amino acids (customPaths) are all filled shapes — no strokes needed.
                // Circles use arc commands, connectors are filled rectangles.
                const isAminoPaths = !!layerConfig.customPaths?.length;

                if (isAminoPaths) {
                    const combinedPath = new GraphicsPath();
                    for (const pd of pathDatas) {
                        if (pd) combinedPath.addPath(new GraphicsPath(pd));
                    }

                    const b = combinedPath.bounds;
                    const width = b.maxX - b.minX;
                    const height = b.maxY - b.minY;

                    if (width > 0 || height > 0) {
                        const maxSize = Math.max(width, height);
                        const centerX = b.minX + width / 2;
                        const centerY = b.minY + height / 2;
                        const scaleX = (2 / maxSize) * rx;
                        const scaleY = (2 / maxSize) * ry;
                        const transform = new Matrix()
                            .translate(-centerX, -centerY)
                            .scale(scaleX, scaleY);

                        combinedPath.transform(transform);

                        // Fill all amino shapes using the stroke color (since they're outlines by nature)
                        g.path(combinedPath);
                        g.fill({ color: strokeColor });
                    }
                } else {
                    // Standard rendering for single customPath (astro, etc.)
                    const combinedPath = new GraphicsPath();
                    for (const pd of pathDatas) {
                        if (pd) combinedPath.addPath(new GraphicsPath(pd));
                    }

                    const b = combinedPath.bounds;
                    const width = b.maxX - b.minX;
                    const height = b.maxY - b.minY;

                    if (width > 0 || height > 0) {
                        const maxSize = Math.max(width, height);
                        const centerX = b.minX + width / 2;
                        const centerY = b.minY + height / 2;

                        const scaleX = (2 / maxSize) * rx;
                        const scaleY = (2 / maxSize) * ry;

                        const transform = new Matrix()
                            .translate(-centerX, -centerY)
                            .scale(scaleX, scaleY);

                        combinedPath.transform(transform);

                        if (layerConfig.fillEnabled) {
                            try {
                                combinedPath.checkForHoles = true;
                                g.path(combinedPath);
                                applyFill();
                            } catch (e) {
                                console.warn("Polygon native fill evenodd failed", e);
                                g.path(combinedPath);
                                applyFill();
                            }
                        }

                        if (layerConfig.strokeEnabled && layerConfig.drawOutline !== false && !isDashed) {
                            g.path(combinedPath);
                            strokeCurrent();
                        }

                        if (layerConfig.strokeEnabled && layerConfig.drawOutline !== false && isDashed) {
                            const pathsList = getUnitCustomShapes(pathDatas);
                            for (const pts of pathsList) {
                                if (pts.length === 0) continue;
                                const polyPoints = pts.map(p => ({ x: p.x * rx, y: p.y * ry }));
                                dashPolygon(g, polyPoints, dashLen, gapLen, true);
                            }
                            strokeCurrent();
                        }
                    }
                }
            } else {
                points = getUnitPolygon(sides);
                const polyPoints = points.map(p => ({ x: p.x * rx, y: p.y * ry }));

                if (isDashed && layerConfig.strokeEnabled) {
                    // Dash needs manual lines, so fill solid polygon first if needed
                    if (layerConfig.fillEnabled) {
                        g.poly(polyPoints.flatMap(p => [p.x, p.y]));
                        applyFill();
                    }
                    dashPolygon(g, polyPoints, dashLen, gapLen, true);
                    strokeCurrent();
                } else {
                    // Standard solid polygon path
                    if (layerConfig.fillEnabled || layerConfig.strokeEnabled) {
                        g.poly(polyPoints.flatMap(p => [p.x, p.y]));
                        if (layerConfig.fillEnabled) applyFill();
                        if (layerConfig.strokeEnabled && layerConfig.drawOutline !== false) strokeCurrent();
                    }
                }
            }

            // For Spokes, StarSkip, Web, and Dots we use the points array natively generated above.
            // Complex multi-path custom SVGs shouldn't use these features typically,
            // but if enabled, they will apply to the main outer bounds subpath.

            if (!isCustomShape) {
                // Spokes
                if (layerConfig.drawSpokes) {
                    points.forEach(p => {
                        const tx = p.x * rx;
                        const ty = p.y * ry;
                        if (isDashed) {
                            dashLine(g, 0, 0, tx, ty, dashLen, gapLen);
                        } else {
                            g.moveTo(0, 0);
                            g.lineTo(tx, ty);
                        }
                    });
                    strokeCurrent();
                }

                // DrawStar / StarSkip
                if (layerConfig.drawStar && layerConfig.starSkip) {
                    const s = layerConfig.starSkip;
                    const len = points.length;
                    if (s >= 2 && s < len) {
                        const visited = new Set<number>();
                        for (let start = 0; start < len; start++) {
                            if (visited.has(start)) continue;
                            const pathPoints: { x: number, y: number }[] = [];
                            let curr = start;
                            while (!visited.has(curr)) {
                                visited.add(curr);
                                pathPoints.push({ x: points[curr].x * rx, y: points[curr].y * ry });
                                curr = (curr + s) % len;
                            }
                            pathPoints.push({ x: points[start].x * rx, y: points[start].y * ry });

                            if (isDashed) {
                                dashPolygon(g, pathPoints, dashLen, gapLen, false);
                            } else {
                                g.poly(pathPoints.flatMap(p => [p.x, p.y]));
                            }
                            strokeCurrent();
                        }
                    }
                }

                // Web
                if (layerConfig.drawWeb) {
                    for (let i = 0; i < points.length; i++) {
                        for (let j = i + 1; j < points.length; j++) {
                            const p1 = { x: points[i].x * rx, y: points[i].y * ry };
                            const p2 = { x: points[j].x * rx, y: points[j].y * ry };
                            if (isDashed) {
                                dashLine(g, p1.x, p1.y, p2.x, p2.y, dashLen, gapLen);
                            } else {
                                g.moveTo(p1.x, p1.y);
                                g.lineTo(p2.x, p2.y);
                            }
                        }
                    }
                    strokeCurrent();
                }

                // Dots (Existing Feature - Corners)
                if (layerConfig.dotsEnabled) {
                    const size = layerConfig.dotSize || 4;
                    const offset = layerConfig.dotOffset ? size / 2 : 0;
                    points.forEach(p => {
                        const px = p.x * (rx + offset);
                        const py = p.y * (ry + offset);
                        g.circle(px, py, size / 2);
                        if (layerConfig.dotType === 'filled') g.fill({ color: layerConfig.strokeColor || '#fff' });
                        else g.stroke({ width: 1, color: layerConfig.strokeColor || '#fff' });
                    });
                }
            }
            break;
        }

        case 'star': {
            const innerRatio = currentStarInnerRadius ?? layerConfig.starInnerRadius ?? 0.5;
            const unitPoints = getUnitStar(sides);

            const getCoord = (idx: number, applyOffset = false) => {
                const pt = unitPoints[idx];
                const size = layerConfig.dotSize || 4;
                const offset = (applyOffset && layerConfig.dotOffset) ? size / 2 : 0;
                const r1x = rx * innerRatio, r1y = ry * innerRatio;
                const px = (pt.type === 'outer') ? pt.x * (rx + offset) : pt.x * (r1x + offset);
                const py = (pt.type === 'outer') ? pt.y * (ry + offset) : pt.y * (r1y + offset);
                return { x: px, y: py };
            };

            const allPoints: { x: number, y: number }[] = [];
            for (let i = 0; i < unitPoints.length; i++) allPoints.push(getCoord(i));

            if (isDashed && layerConfig.strokeEnabled) {
                if (layerConfig.fillEnabled) {
                    g.poly(allPoints.flatMap(p => [p.x, p.y]));
                    applyFill();
                }
                dashPolygon(g, allPoints, dashLen, gapLen, true);
                strokeCurrent();
            } else {
                if (layerConfig.fillEnabled || layerConfig.strokeEnabled) {
                    g.poly(allPoints.flatMap(p => [p.x, p.y]));
                    if (layerConfig.fillEnabled) applyFill();
                    if (layerConfig.strokeEnabled && layerConfig.drawOutline !== false) strokeCurrent();
                }
            }

            // Spokes
            if (layerConfig.drawSpokes) {
                for (let i = 0; i < unitPoints.length; i++) {
                    if (unitPoints[i].type === 'outer') {
                        const p = getCoord(i);
                        if (isDashed) dashLine(g, 0, 0, p.x, p.y, dashLen, gapLen);
                        else { g.moveTo(0, 0); g.lineTo(p.x, p.y); }
                    }
                }
                strokeCurrent();
            }

            // Star Skip for Star
            if (layerConfig.drawStar && layerConfig.starSkip) {
                const outerIndices = unitPoints.map((p, i) => ({ p, index: i })).filter(item => item.p.type === 'outer');
                const s = layerConfig.starSkip;
                const len = outerIndices.length;

                if (s >= 2 && s < len) {
                    const visited = new Set<number>();
                    for (let start = 0; start < len; start++) {
                        if (visited.has(start)) continue;
                        const pathPoints: { x: number, y: number }[] = [];
                        let curr = start;
                        while (!visited.has(curr)) {
                            visited.add(curr);
                            pathPoints.push(getCoord(outerIndices[curr].index));
                            curr = (curr + s) % len;
                        }
                        pathPoints.push(getCoord(outerIndices[start].index)); // Close

                        if (isDashed) dashPolygon(g, pathPoints, dashLen, gapLen, false);
                        else g.poly(pathPoints.flatMap(p => [p.x, p.y]));
                        strokeCurrent();
                    }
                }
            }

            // Web
            if (layerConfig.drawWeb) {
                for (let i = 0; i < unitPoints.length; i++) {
                    for (let j = i + 1; j < unitPoints.length; j++) {
                        const p1 = getCoord(i);
                        const p2 = getCoord(j);
                        if (isDashed) dashLine(g, p1.x, p1.y, p2.x, p2.y, dashLen, gapLen);
                        else { g.moveTo(p1.x, p1.y); g.lineTo(p2.x, p2.y); }
                    }
                }
                strokeCurrent();
            }

            // Dots
            if (layerConfig.dotsEnabled) {
                const size = layerConfig.dotSize || 4;
                for (let i = 0; i < unitPoints.length; i++) {
                    const p = getCoord(i, true);
                    g.circle(p.x, p.y, size / 2);
                }
                if (layerConfig.dotType === 'filled') g.fill({ color: layerConfig.strokeColor || '#fff' });
                else g.stroke({ width: 1, color: layerConfig.strokeColor || '#fff' });
            }
            break;
        }

        case 'circle': {
            const endAngle = currentShapeArc * (Math.PI / 180);

            if (isDashed && layerConfig.strokeEnabled) {
                // Dash stroke needs separate logic
                if (layerConfig.fillEnabled) {
                    if (currentShapeArc >= 360) g.ellipse(0, 0, rx, ry);
                    else {
                        g.moveTo(0, 0);
                        ellipticalArc(g, 0, 0, rx, ry, 0, endAngle);
                        g.closePath();
                    }
                    applyFill();
                }
                dashArc(g, 0, 0, rx, ry, 0, endAngle, dashLen, gapLen);
                strokeCurrent();
            } else {
                // Standard solid path
                if (layerConfig.fillEnabled || layerConfig.strokeEnabled) {
                    if (currentShapeArc >= 360) g.ellipse(0, 0, rx, ry);
                    else {
                        if (layerConfig.fillEnabled) {
                            // If filled, we usually stroke the pie slice edges too? Yes, we drew center lines
                            g.moveTo(0, 0);
                            ellipticalArc(g, 0, 0, rx, ry, 0, endAngle);
                            g.closePath();
                        } else {
                            ellipticalArc(g, 0, 0, rx, ry, 0, endAngle);
                        }
                    }
                    if (layerConfig.fillEnabled) applyFill();
                    if (layerConfig.strokeEnabled) strokeCurrent();
                }
            }

            // Dots
            if (layerConfig.dotsEnabled) {
                const dotRad = (layerConfig.dotSize || 4) / 2;
                const offset = layerConfig.dotOffset ? dotRad : 0;
                const angleOff = (rx > 0.01) ? offset / rx : 0;

                const sA = 0 - angleOff;
                const eA = (currentShapeArc * Math.PI / 180) + angleOff;

                g.circle(Math.cos(sA) * rx, Math.sin(sA) * ry, dotRad);
                g.circle(Math.cos(eA) * rx, Math.sin(eA) * ry, dotRad);

                if (layerConfig.dotType === 'filled') g.fill({ color: layerConfig.strokeColor || '#fff' });
                else g.stroke({ width: 1, color: layerConfig.strokeColor || '#fff' });
            }

            break;
        }

        case 'line': {
            const anchor = layerConfig.lineAnchor || 'center';
            let p1x = -rx, p2x = rx;
            if (anchor === 'start') { p1x = 0; p2x = rx * 2; }
            if (anchor === 'end') { p1x = -rx * 2; p2x = 0; }

            if (layerConfig.strokeEnabled) {
                if (isDashed) {
                    dashLine(g, p1x, 0, p2x, 0, dashLen, gapLen);
                } else {
                    g.moveTo(p1x, 0);
                    g.lineTo(p2x, 0);
                }
                strokeCurrent();
            }

            if (layerConfig.dotsEnabled) {
                const size = (layerConfig.dotSize || 4) / 2;
                const offset = layerConfig.dotOffset ? size : 0;
                let d1 = p1x, d2 = p2x;
                if (offset > 0 && Math.abs(p2x - p1x) > 0.0001) {
                    const dir = Math.sign(p2x - p1x);
                    d1 -= dir * offset; d2 += dir * offset;
                }
                g.circle(d1, 0, size);
                g.circle(d2, 0, size);
                if (layerConfig.dotType === 'filled') g.fill({ color: layerConfig.strokeColor || '#fff' });
                else g.stroke({ width: 1, color: layerConfig.strokeColor || '#fff' });
            }
            break;
        }

        case 'vesica': {
            const h = ry * Math.sqrt(3) / 2;

            if (layerConfig.fillEnabled) {
                g.moveTo(0, -h);
                // vesica is the intersection of two circles/ellipses
                // -r*0.5 is the x-center offset
                ellipticalArc(g, -rx * 0.5, 0, rx, ry, -Math.PI / 3, Math.PI / 3);
                ellipticalArc(g, rx * 0.5, 0, rx, ry, 2 * Math.PI / 3, 4 * Math.PI / 3);
                g.closePath();
                applyFill();
            }

            if (layerConfig.strokeEnabled) {
                if (isDashed) {
                    dashArc(g, -rx * 0.5, 0, rx, ry, -Math.PI / 3, Math.PI / 3, dashLen, gapLen);
                    dashArc(g, rx * 0.5, 0, rx, ry, 2 * Math.PI / 3, 4 * Math.PI / 3, dashLen, gapLen);
                } else {
                    g.moveTo(0, -h);
                    ellipticalArc(g, -rx * 0.5, 0, rx, ry, -Math.PI / 3, Math.PI / 3);
                    ellipticalArc(g, rx * 0.5, 0, rx, ry, 2 * Math.PI / 3, 4 * Math.PI / 3);
                    g.closePath();
                }
                strokeCurrent();
            }
            break;
        }

        case 'molecule':
            drawMolecule(g, rx, ry, layerConfig, strokeColor, fillColor, rotateX, rotateY);
            break;
        case 'iching_lines':
            drawIChingLines(g, rx, ry, layerConfig, strokeColor, currentStrokeWeight);
            break;
        case 'iching':
            drawIChingHexagram(g, rx, ry, layerConfig, progress, strokeColor, fillColor);
            break;
        case 'polyhedron':
            // Using currentShapeArc (mapped from rotateShape) as rotateZ
            // Assuming currentShapeArc defaults to 360, but rotateShape acts as 0-360 deg.
            // If currentShapeArc is actually 360 when no keyframe, that's fine as 360=0 deg.
            drawPolyhedron(g, rx, ry, layerConfig, strokeColor, fillColor, rotateX, rotateY, currentShapeArc, currentStrokeWeight, currentPerspective);
            break;
        case 'custom':
            updatePrimitive(g, 'polygon', rx, ry, sides, density, layerConfig, progress, currentStrokeWeight, currentShapeArc, currentStarInnerRadius, rotateX, rotateY, currentPerspective);
            break;
        case 'diamond':
            updatePrimitive(g, 'polygon', rx, ry, 4, density, layerConfig, progress, currentStrokeWeight, currentShapeArc, currentStarInnerRadius, rotateX, rotateY, currentPerspective);
            break;
    }
};
