/**
 * Astro Data Entry — Astrological Symbol SVG Paths
 * 
 * Bundles the 12 zodiac symbol SVG paths as a global.
 * The player bundle accesses these via window.ASTRO_DATA.ASTRO_PATHS.
 * 
 * Build: npm run build:astro
 */
import { ASTRO_PATHS } from './data/astro';

(window as any).ASTRO_DATA = { ASTRO_PATHS };
