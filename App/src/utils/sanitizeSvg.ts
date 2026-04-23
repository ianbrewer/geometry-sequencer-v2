import DOMPurify, { type Config } from 'dompurify';

const SVG_PURIFY_CONFIG: Config = {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: ['script', 'foreignObject', 'use'],
    FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover', 'href', 'xlink:href'],
};

export function sanitizeSvg(raw: string): string {
    const cleaned = DOMPurify.sanitize(raw, SVG_PURIFY_CONFIG);
    return typeof cleaned === 'string' ? cleaned : String(cleaned ?? '');
}

export async function sanitizeSvgFile(file: File): Promise<File> {
    const text = await file.text();
    const cleaned = sanitizeSvg(text);
    return new File([cleaned], file.name, { type: 'image/svg+xml' });
}
