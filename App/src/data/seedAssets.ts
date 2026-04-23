// Seed asset generators (Stage F).
//
// These produce SVG strings for the three legacy hardcoded icon sets so they
// can be uploaded as real `assets` rows in the v2-user-assets bucket. The user
// then treats them like any other asset folder; legacy projects get migrated
// to `asset_set` pointing at the matching seed folder.
//
// Sizing: all SVGs use viewBox `0 0 120 120` to match the original shape
// coordinate range (roughly 10..110 in both axes). Strokes use white so the
// seed shapes remain visible on the default dark canvas; users can replace
// these with their own colored versions at any time.

import { ASTRO_PATHS } from './astro';
import { AMINO_PATHS } from './amino';
import { getHexagramConfig } from '../utils/iching';

export const SEED_FOLDER_NAMES = {
    astrology: 'Astrology',
    amino: 'Amino Acids',
    ichingLines: 'I-Ching Strokes',
} as const;

export type SeedAsset = { name: string; svg: string };

const SVG_W = 120;
const SVG_H = 120;

const wrapSvg = (body: string): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_W} ${SVG_H}" width="${SVG_W}" height="${SVG_H}">${body}</svg>`;

const pad2 = (n: number): string => n.toString().padStart(2, '0');

export const generateAstrologySvgs = (): SeedAsset[] => {
    const names = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
    ];
    return ASTRO_PATHS.map((d, i) => ({
        name: `${pad2(i + 1)}-${names[i] ?? 'sign'}.svg`,
        svg: wrapSvg(
            `<path d="${d}" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
        ),
    }));
};

export const generateAminoSvgs = (): SeedAsset[] => {
    // Three-letter codes ordered to match the AMINO_PATHS array authoring order.
    const names = [
        'ala', 'arg', 'asn', 'asp', 'cys', 'gln', 'glu', 'gly', 'his', 'ile',
        'leu', 'lys', 'met', 'phe', 'pro', 'ser', 'thr', 'trp', 'tyr', 'val',
    ];
    return AMINO_PATHS.map((paths, i) => {
        const body = paths.map(d => `<path d="${d}"/>`).join('');
        return {
            name: `${pad2(i + 1)}-${names[i] ?? 'amino'}.svg`,
            svg: wrapSvg(`<g fill="white" stroke="none">${body}</g>`),
        };
    });
};

// Mirrors drawIChingLines from IChingRenderer.ts: six horizontal strokes,
// broken (yin) lines split with a centered gap of ~30% lineWidth.
export const generateIChingStrokeSvgs = (): SeedAsset[] => {
    const assets: SeedAsset[] = [];

    const cx = SVG_W / 2;
    const cy = SVG_H / 2;
    const rx = 50;
    const ry = 50;
    const lineWidth = rx * 2;
    const halfW = lineWidth / 2;
    const gapSize = lineWidth * 0.3;
    const strokeWidth = 4;

    for (let id = 1; id <= 64; id++) {
        const hexagram = getHexagramConfig(id);
        const lines: string[] = [];

        for (let i = 0; i < 6; i++) {
            const t = i / 5;
            const yPos = cy + (ry - t * 2 * ry); // i=0 bottom, i=5 top
            const isBroken = hexagram[i];

            if (!isBroken) {
                lines.push(
                    `<line x1="${cx - halfW}" y1="${yPos}" x2="${cx + halfW}" y2="${yPos}"/>`
                );
            } else {
                const halfGap = gapSize / 2;
                const segW = halfW - halfGap;
                lines.push(
                    `<line x1="${cx - halfW}" y1="${yPos}" x2="${cx - halfW + segW}" y2="${yPos}"/>`
                );
                lines.push(
                    `<line x1="${cx + halfGap}" y1="${yPos}" x2="${cx + halfGap + segW}" y2="${yPos}"/>`
                );
            }
        }

        assets.push({
            name: `${id.toString().padStart(2, '0')}-hex.svg`,
            svg: wrapSvg(
                `<g stroke="white" stroke-width="${strokeWidth}" stroke-linecap="round" fill="none">${lines.join('')}</g>`
            ),
        });
    }

    return assets;
};

// Maps a legacy shape-type string to the seed folder name used for migration.
export const LEGACY_TYPE_TO_SEED_FOLDER: Record<string, string> = {
    astrology: SEED_FOLDER_NAMES.astrology,
    amino: SEED_FOLDER_NAMES.amino,
    iching_lines: SEED_FOLDER_NAMES.ichingLines,
};
