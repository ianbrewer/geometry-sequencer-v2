/**
 * PixiJS Entry Point — Global Bundle
 * 
 * This file bundles PixiJS core + filters into a single IIFE
 * that exposes everything as globals (window.PIXI, window.PIXI_FILTERS).
 * 
 * The player bundle (player.js) depends on these globals being loaded first.
 * 
 * To REMOVE a filter you don't need:
 *   1. Delete its import below
 *   2. Remove it from the PIXI_FILTERS assignment
 *   3. Rebuild: npm run build:pixi
 *   
 * To ADD a new pixi-filters package:
 *   1. npm install pixi-filters
 *   2. Import and add it below
 *   3. Rebuild: npm run build:pixi
 */

// ── PixiJS Core ─────────────────────────────────────────────
import * as PIXI from 'pixi.js';

// ── PixiJS Filters ──────────────────────────────────────────
import { GlowFilter } from 'pixi-filters/glow';
import { ShockwaveFilter } from 'pixi-filters/shockwave';
import { TwistFilter } from 'pixi-filters/twist';
import { BulgePinchFilter } from 'pixi-filters/bulge-pinch';
import { MotionBlurFilter } from 'pixi-filters/motion-blur';
import { AdvancedBloomFilter } from 'pixi-filters/advanced-bloom';

// ── Expose as Globals ───────────────────────────────────────
// The player bundle accesses these via window.PIXI / window.PIXI_FILTERS
(window as any).PIXI = PIXI;
(window as any).PIXI_FILTERS = {
    GlowFilter,
    ShockwaveFilter,
    TwistFilter,
    BulgePinchFilter,
    MotionBlurFilter,
    AdvancedBloomFilter,
};
