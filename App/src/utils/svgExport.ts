// Prototype SVG snapshot exporter.
//
// Walks the live Pixi v8 scene graph after a render and serializes leaves
// (Graphics, Sprite) with their flattened worldTransform into a single SVG
// document. Containers are not emitted directly — their transforms are baked
// into descendants via worldTransform.
//
// Known limitations (acceptable for prototype):
//   - Pixi filters (blur, glow, displacement, twist, bulge, etc.) are NOT
//     translated. The output reflects pre-filter geometry.
//   - Texture/gradient fills fall back to the underlying solid color (or are
//     skipped if no usable color is available).
//   - Mask/clip nodes are skipped (logged).
//   - Some exotic path actions (roundShape/filletRect/chamferRect) are
//     approximated as their non-rounded equivalents.

import type { Application, Container, Graphics, Sprite } from 'pixi.js';
import type { Project } from '../types';

type AnyNode = Container & {
    worldTransform: { a: number; b: number; c: number; d: number; tx: number; ty: number };
    worldAlpha?: number;
    groupAlpha?: number;
    visible: boolean;
    renderable: boolean;
    children: AnyNode[];
};

interface SVGCtx {
    parts: string[];
    warnings: Set<string>;
    bbox: { minX: number; minY: number; maxX: number; maxY: number };
}

export interface SVGExportResult {
    svg: string;
    warnings: string[];
}

export type SVGFrameMode = 'first' | 'last' | 'time';

export interface SVGRenderOptions {
    mode: SVGFrameMode;
    time?: number; // used when mode === 'time' (seconds)
    width?: number;
    height?: number;
}

export function resolveFrameTime(project: Project, opts: SVGRenderOptions): number {
    const dur = project.duration || 10;
    if (opts.mode === 'first') return 0;
    if (opts.mode === 'last') return Math.max(0, dur - 0.001);
    return Math.max(0, Math.min(dur, opts.time ?? 0));
}

// Renders the given project at the given time in a detached Pixi app and
// serializes the resulting scene graph to SVG. Used for ExportModal (any
// project, any frame) and batch export.
export async function renderProjectToSVG(
    project: Project,
    opts: SVGRenderOptions,
): Promise<SVGExportResult> {
    const width = opts.width ?? 1080;
    const height = opts.height ?? 1080;

    const { Application } = await import('pixi.js');
    const { GeometryRenderer } = await import('../rendering/GeometryRenderer');

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const app = new (Application as any)();
    await app.init({
        canvas,
        width,
        height,
        backgroundColor: project.backgroundColor || '#000000',
        antialias: true,
        autoDensity: true,
        resolution: 1,
        preference: 'webgl',
    });

    try {
        const renderer = new GeometryRenderer();
        const t = resolveFrameTime(project, opts);
        renderer.render(app, project, t, false);
        const result = exportStageToSVG(app, project);
        renderer.cleanup();
        return result;
    } finally {
        app.destroy(true, { children: true, texture: true });
    }
}

export function exportStageToSVG(app: Application, project: Project): SVGExportResult {
    const bg = project.backgroundColor || '#000000';

    const ctx: SVGCtx = {
        parts: [],
        warnings: new Set(),
        bbox: { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
    };

    // Force Pixi to flush any pending updates so worldTransform is current.
    // Caller is expected to have rendered the desired frame already.
    app.renderer.render(app.stage as any);

    const stats = { containers: 0, graphics: 0, sprites: 0, skipped: 0, emitted: 0 };
    walk(app.stage as unknown as AnyNode, ctx, stats);
    console.log('[svgExport] walk stats:', stats);

    // Compute viewBox from emitted bounds (or fall back to the canvas).
    const padding = 20;
    let { minX, minY, maxX, maxY } = ctx.bbox;
    if (!isFinite(minX) || !isFinite(maxX)) {
        minX = 0; minY = 0; maxX = app.screen.width; maxY = app.screen.height;
    } else {
        minX -= padding; minY -= padding; maxX += padding; maxY += padding;
    }
    const vbW = maxX - minX;
    const vbH = maxY - minY;

    const header =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${vbW}" height="${vbH}" ` +
        `viewBox="${minX} ${minY} ${vbW} ${vbH}">` +
        `<rect x="${minX}" y="${minY}" width="${vbW}" height="${vbH}" fill="${bg}"/>`;

    return {
        svg: header + '\n' + ctx.parts.join('\n') + '\n</svg>',
        warnings: [...ctx.warnings],
    };
}

function walk(node: AnyNode, ctx: SVGCtx, stats: any) {
    if (!node) return;
    if (node.visible === false || node.renderable === false) {
        stats.skipped++;
        return;
    }

    const alpha = (node.groupAlpha ?? node.worldAlpha ?? 1);

    const anyNode = node as any;

    if (anyNode.context && Array.isArray(anyNode.context.instructions)) {
        stats.graphics++;
        const before = ctx.parts.length;
        emitGraphics(anyNode as Graphics & AnyNode, alpha, ctx);
        if (ctx.parts.length > before) stats.emitted++;
    } else if (anyNode.texture && anyNode.anchor && typeof anyNode.width === 'number') {
        stats.sprites++;
        ctx.warnings.add('Sprite skipped (vectors-only export)');
    } else {
        stats.containers++;
    }

    if (node.children?.length) {
        for (const child of node.children) walk(child, ctx, stats);
    }
}

function emitGraphics(g: Graphics & AnyNode, alpha: number, ctx: SVGCtx) {
    const m = g.worldTransform;
    const transform = `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.tx} ${m.ty})`;

    const instructions = (g as any).context.instructions as Array<any>;
    if (!instructions.length) return;

    const inner: string[] = [];

    // Pre-pass: pair adjacent fill+stroke that share the same path object so
    // we can emit one SVG element with both fill and stroke attributes.
    type Slot = { fill?: any; stroke?: any; path: any };
    const slots: Slot[] = [];
    for (const ins of instructions) {
        const data = ins.data || {};
        if (ins.action === 'fill' || ins.action === 'stroke') {
            const last = slots[slots.length - 1];
            if (last && last.path === data.path && !last[ins.action as 'fill' | 'stroke']) {
                last[ins.action as 'fill' | 'stroke'] = data.style;
            } else {
                slots.push({ path: data.path, [ins.action]: data.style });
            }
        } else if (ins.action === 'cut') {
            ctx.warnings.add('Path cut/hole not supported in prototype');
        } else if (ins.action === 'texture') {
            ctx.warnings.add('Texture instruction skipped (use Sprite layers instead)');
        }
    }

    for (const slot of slots) {
        // Strokes with gradient fall back to the gradient's mid-stop color so
        // outlines (which can't form a full-canvas overlay) remain visible.
        // Fills with gradient are skipped — those tend to be full-canvas
        // backgrounds that would obscure everything.
        const fillStyle = slot.fill && !isGradientStyle(slot.fill) ? slot.fill : null;
        const strokeStyle = slot.stroke
            ? (isGradientStyle(slot.stroke) ? flattenGradient(slot.stroke, ctx) : slot.stroke)
            : null;
        if (slot.fill && !fillStyle) ctx.warnings.add('fill skipped (gradient)');
        if (!fillStyle && !strokeStyle) continue;

        const fillA = fillStyle ? fillAttrs(fillStyle, alpha, ctx) : 'fill="none"';
        const strokeA = strokeStyle ? strokeAttrs(strokeStyle, alpha, ctx) : '';
        const styleAttrs = `${fillA}${strokeA ? ' ' + strokeA : ''}`;

        const el = pathToSVGElement(slot.path?.instructions ?? [], styleAttrs, ctx);
        if (el) inner.push(el);
    }

    if (!inner.length) return;
    ctx.parts.push(`<g transform="${transform}" opacity="${alpha}">${inner.join('')}</g>`);

    // Union into export bbox using Pixi's world-space bounds.
    try {
        const b: any = (g as any).getBounds(true);
        const r = b?.rectangle ?? b;
        if (r && isFinite(r.x) && isFinite(r.y) && isFinite(r.width) && isFinite(r.height)) {
            if (r.x < ctx.bbox.minX) ctx.bbox.minX = r.x;
            if (r.y < ctx.bbox.minY) ctx.bbox.minY = r.y;
            if (r.x + r.width > ctx.bbox.maxX) ctx.bbox.maxX = r.x + r.width;
            if (r.y + r.height > ctx.bbox.maxY) ctx.bbox.maxY = r.y + r.height;
        }
    } catch {
        // Bounds unavailable — fall back to canvas-sized viewBox at the end.
    }
}

function emitSprite(s: Sprite & AnyNode, alpha: number, ctx: SVGCtx) {
    const m = s.worldTransform;
    const transform = `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.tx} ${m.ty})`;

    const tex = (s as any).texture;
    const source = tex?.source?.resource ?? tex?.source?._resource;
    let href: string | null = null;
    let sw = tex?.frame?.width ?? tex?.width ?? s.width;
    let sh = tex?.frame?.height ?? tex?.height ?? s.height;

    try {
        if (source instanceof HTMLImageElement) {
            href = imageToDataURL(source, sw, sh);
        } else if (source instanceof HTMLCanvasElement) {
            href = source.toDataURL('image/png');
        } else if (source instanceof ImageBitmap) {
            const c = document.createElement('canvas');
            c.width = source.width;
            c.height = source.height;
            c.getContext('2d')!.drawImage(source, 0, 0);
            href = c.toDataURL('image/png');
            sw = source.width;
            sh = source.height;
        }
    } catch (e) {
        ctx.warnings.add('Sprite source could not be embedded: ' + (e as Error).message);
    }

    if (!href) {
        ctx.warnings.add('Sprite skipped: unsupported texture source');
        return;
    }

    // Apply anchor: Pixi sprite local origin is anchor*size; SVG <image> origin
    // is top-left, so shift by -anchor*size in local coords.
    const ax = (s as any).anchor?.x ?? 0;
    const ay = (s as any).anchor?.y ?? 0;
    const ox = -ax * sw;
    const oy = -ay * sh;

    ctx.parts.push(
        `<g transform="${transform}" opacity="${alpha}">` +
        `<image x="${ox}" y="${oy}" width="${sw}" height="${sh}" href="${href}" preserveAspectRatio="none"/>` +
        `</g>`,
    );
}

function imageToDataURL(img: HTMLImageElement, w: number, h: number): string {
    const c = document.createElement('canvas');
    c.width = w || img.naturalWidth;
    c.height = h || img.naturalHeight;
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/png');
}

// --- Style conversion ---------------------------------------------------

function fillAttrs(style: any, layerAlpha: number, ctx: SVGCtx): string {
    const { color, opacity } = resolveColor(style, ctx);
    const a = (opacity ?? 1) * layerAlpha;
    if (color == null) return 'fill="none"';
    return `fill="${color}" fill-opacity="${a}"`;
}

function strokeAttrs(style: any, layerAlpha: number, ctx: SVGCtx): string {
    const { color, opacity } = resolveColor(style, ctx);
    const a = (opacity ?? 1) * layerAlpha;
    const width = style?.width ?? 1;
    const cap = style?.cap ?? 'butt';
    const join = style?.join ?? 'miter';
    const miterlimit = style?.miterLimit ?? 10;
    const stroke = color ?? '#000000';
    return `stroke="${stroke}" stroke-opacity="${a}" stroke-width="${width}" stroke-linecap="${cap}" stroke-linejoin="${join}" stroke-miterlimit="${miterlimit}"`;
}

function flattenGradient(style: any, ctx: SVGCtx): any {
    const stops = style?.fill?.colorStops;
    if (!Array.isArray(stops) || !stops.length) return style;
    const mid = stops[Math.floor(stops.length / 2)] ?? stops[0];
    let color: number | undefined;
    if (typeof mid.color === 'number') color = mid.color;
    else if (mid.color && typeof mid.color.toNumber === 'function') color = mid.color.toNumber();
    if (color == null) return style;
    ctx.warnings.add('Gradient stroke flattened to mid-stop color');
    return { ...style, color, fill: null };
}

function isGradientStyle(style: any): boolean {
    if (!style) return false;
    const f = style.fill;
    return !!(f && Array.isArray(f.colorStops) && f.colorStops.length);
}

function resolveColor(style: any, ctx: SVGCtx): { color: string | null; opacity: number } {
    if (!style) return { color: null, opacity: 1 };
    const opacity = typeof style.alpha === 'number' ? style.alpha : 1;

    const c = style.color;
    if (typeof c === 'number') {
        const hex = '#' + (c & 0xffffff).toString(16).padStart(6, '0');
        if (style.texture && style.texture.source) {
            ctx.warnings.add('Texture fill flattened to base color');
        }
        return { color: hex, opacity };
    }
    return { color: null, opacity };
}

// --- Element conversion --------------------------------------------------

// If the path is a single primitive instruction, emit the matching native SVG
// element so output stays editable in vector tools. Otherwise fall back to
// <path d="...">.
function pathToSVGElement(instructions: Array<any>, styleAttrs: string, ctx: SVGCtx): string {
    if (instructions.length === 1) {
        const ins = instructions[0];
        const d = ins.data || [];
        switch (ins.action) {
            case 'circle':
                return `<circle cx="${d[0]}" cy="${d[1]}" r="${d[2]}" ${styleAttrs}/>`;
            case 'ellipse':
                return `<ellipse cx="${d[0]}" cy="${d[1]}" rx="${d[2]}" ry="${d[3]}" ${styleAttrs}/>`;
            case 'rect':
                return `<rect x="${d[0]}" y="${d[1]}" width="${d[2]}" height="${d[3]}" ${styleAttrs}/>`;
            case 'roundRect': {
                const [x, y, w, h, r] = d;
                const rr = typeof r === 'number' ? ` rx="${r}" ry="${r}"` : '';
                return `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rr} ${styleAttrs}/>`;
            }
            case 'poly': {
                const pts: number[] = d[0] || [];
                // Pixi's poly(points, close) defaults close to true when omitted,
                // and the renderer treats `undefined` as closed. Match that.
                const close = d[1] !== false;
                if (pts.length < 4) break;
                const points = pairs(pts);
                const tag = close ? 'polygon' : 'polyline';
                return `<${tag} points="${points}" ${styleAttrs}/>`;
            }
            case 'regularPoly': {
                const [cx, cy, r, sides, rot = 0] = d;
                const pts: number[] = [];
                for (let i = 0; i < sides; i++) {
                    const a = rot + (i * Math.PI * 2) / sides;
                    pts.push(cx + r * Math.cos(a), cy + r * Math.sin(a));
                }
                return `<polygon points="${pairs(pts)}" ${styleAttrs}/>`;
            }
        }
    }
    const dStr = pathToSVGD(instructions, ctx);
    if (!dStr) return '';
    return `<path d="${dStr}" ${styleAttrs}/>`;
}

function pairs(flat: number[]): string {
    const out: string[] = [];
    for (let i = 0; i < flat.length; i += 2) out.push(`${flat[i]},${flat[i + 1]}`);
    return out.join(' ');
}

// --- Path conversion ----------------------------------------------------

function pathToSVGD(instructions: Array<any>, ctx: SVGCtx): string {
    const parts: string[] = [];
    let hasPoint = false;
    for (let i = 0; i < instructions.length; i++) {
        const ins = instructions[i];
        const d = ins.data || [];
        switch (ins.action) {
            case 'moveTo':
                parts.push(`M ${d[0]} ${d[1]}`);
                hasPoint = true;
                break;
            case 'lineTo':
                if (!hasPoint) { parts.push(`M ${d[0]} ${d[1]}`); hasPoint = true; break; }
                parts.push(`L ${d[0]} ${d[1]}`);
                break;
            case 'bezierCurveTo':
                if (!hasPoint) parts.push(`M ${d[0]} ${d[1]}`);
                parts.push(`C ${d[0]} ${d[1]} ${d[2]} ${d[3]} ${d[4]} ${d[5]}`);
                hasPoint = true;
                break;
            case 'quadraticCurveTo':
                if (!hasPoint) parts.push(`M ${d[0]} ${d[1]}`);
                parts.push(`Q ${d[0]} ${d[1]} ${d[2]} ${d[3]}`);
                hasPoint = true;
                break;
            case 'closePath':
                parts.push('Z');
                break;
            case 'rect': {
                const [x, y, w, h] = d;
                parts.push(`M ${x} ${y} h ${w} v ${h} h ${-w} Z`);
                hasPoint = false;
                break;
            }
            case 'circle': {
                const [cx, cy, r] = d;
                parts.push(
                    `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`,
                );
                hasPoint = false;
                break;
            }
            case 'ellipse': {
                // [x, y, rx, ry] — Pixi's ellipse instruction is just a full ellipse
                const [cx, cy, rx, ry] = d;
                parts.push(
                    `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`,
                );
                hasPoint = false;
                break;
            }
            case 'roundRect':
            case 'filletRect':
            case 'chamferRect': {
                // Approximate as plain rect (acceptable for prototype)
                const [x, y, w, h] = d;
                parts.push(`M ${x} ${y} h ${w} v ${h} h ${-w} Z`);
                hasPoint = false;
                ctx.warnings.add(`${ins.action} approximated as rect in prototype`);
                break;
            }
            case 'arcToSvg': {
                // [rx, ry, xAxisRotation, largeArc, sweep, x, y]
                const [rx, ry, rot, large, sweep, x, y] = d;
                if (!hasPoint) parts.push(`M ${x} ${y}`);
                parts.push(`A ${rx} ${ry} ${rot} ${large ? 1 : 0} ${sweep ? 1 : 0} ${x} ${y}`);
                hasPoint = true;
                break;
            }
            case 'arc': {
                // [x, y, radius, startAngle, endAngle, counterclockwise]
                const [cx, cy, r, a0, a1, ccw] = d;
                const startX = cx + r * Math.cos(a0);
                const startY = cy + r * Math.sin(a0);
                const endX = cx + r * Math.cos(a1);
                const endY = cy + r * Math.sin(a1);
                let delta = a1 - a0;
                if (ccw) {
                    while (delta > 0) delta -= Math.PI * 2;
                } else {
                    while (delta < 0) delta += Math.PI * 2;
                }
                const large = Math.abs(delta) > Math.PI ? 1 : 0;
                const sweep = ccw ? 0 : 1;
                // Canvas semantics: if a current point exists, draw a line to
                // the arc start point first; otherwise begin a new subpath.
                parts.push(`${hasPoint ? 'L' : 'M'} ${startX} ${startY} A ${r} ${r} 0 ${large} ${sweep} ${endX} ${endY}`);
                hasPoint = true;
                break;
            }
            case 'arcTo': {
                // Pixi arcTo is hard to translate exactly; emit a line to first
                // tangent target as an approximation.
                const [, , x2, y2] = d;
                parts.push(`L ${x2} ${y2}`);
                ctx.warnings.add('arcTo approximated as lineTo');
                break;
            }
            case 'poly': {
                // [points: number[], close?: boolean] — Pixi defaults close=true.
                const pts: number[] = d[0] || [];
                const close = d[1] !== false;
                if (pts.length >= 2) {
                    parts.push(`M ${pts[0]} ${pts[1]}`);
                    for (let j = 2; j < pts.length; j += 2) parts.push(`L ${pts[j]} ${pts[j + 1]}`);
                    if (close) { parts.push('Z'); hasPoint = false; }
                    else hasPoint = true;
                }
                break;
            }
            case 'regularPoly': {
                // [x, y, radius, sides, rotation]
                const [cx, cy, r, sides, rot = 0] = d;
                for (let j = 0; j < sides; j++) {
                    const a = rot + (j * Math.PI * 2) / sides;
                    const px = cx + r * Math.cos(a);
                    const py = cy + r * Math.sin(a);
                    parts.push(j === 0 ? `M ${px} ${py}` : `L ${px} ${py}`);
                }
                parts.push('Z');
                hasPoint = false;
                break;
            }
            case 'roundPoly':
            case 'roundShape': {
                ctx.warnings.add(`${ins.action} not implemented; output may be incomplete`);
                break;
            }
            case 'addPath': {
                // Recurse into nested path. Pixi's PrimitiveRenderer applies
                // any required transform via combinedPath.transform(...) before
                // calling g.path(...), so by the time we see addPath here the
                // outer transform is typically identity.
                const sub = d[0];
                const m = d[1];
                if (m && (m.a !== 1 || m.b !== 0 || m.c !== 0 || m.d !== 1 || m.tx !== 0 || m.ty !== 0)) {
                    ctx.warnings.add('addPath transform not applied (non-identity)');
                }
                if (sub?.instructions) {
                    parts.push(pathToSVGD(sub.instructions, ctx));
                }
                hasPoint = false;
                break;
            }
            default:
                ctx.warnings.add(`Unhandled path action: ${ins.action}`);
                console.warn('[svgExport] unhandled path action', ins.action, ins);
        }
    }
    return parts.join(' ');
}

export function downloadSVG(svg: string, filename: string) {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
