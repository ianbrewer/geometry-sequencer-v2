import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite build config for the Geometry Sequencer player bundle.
 * Produces public/player.js — the animation rendering logic ONLY.
 * 
 * IMPORTANT: All dependencies are externalized:
 *   - PixiJS → pixi-bundle.js (window.PIXI, window.PIXI_FILTERS)
 *   - Astro data → astro-data.js (window.ASTRO_DATA) [optional]
 *   - Amino data → amino-data.js (window.AMINO_DATA) [optional]
 * 
 * Build: npx vite build --config vite.player.config.ts
 */
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/player.ts'),
            name: 'GeometryPlayer',
            fileName: () => 'player.js',
            formats: ['iife'],
        },
        outDir: 'public',
        emptyOutDir: false,
        minify: true,
        rollupOptions: {
            // Externalize all non-player dependencies
            external: (id: string) => {
                // PixiJS core
                if (id === 'pixi.js') return true;
                // PixiJS filters
                if (id.startsWith('pixi-filters/')) return true;
                // SVG data files (astro + amino)
                if (id.endsWith('/data/astro') || id.endsWith('data/astro.ts')) return true;
                if (id.endsWith('/data/amino') || id.endsWith('data/amino.ts')) return true;
                return false;
            },
            output: {
                globals: (id: string) => {
                    // PixiJS
                    if (id === 'pixi.js') return 'PIXI';
                    if (id.startsWith('pixi-filters/')) return 'PIXI_FILTERS';
                    // SVG data — map to their global objects
                    if (id.includes('data/astro')) return 'ASTRO_DATA';
                    if (id.includes('data/amino')) return 'AMINO_DATA';
                    return id;
                },
            },
        },
    },
    define: {
        'process.env.NODE_ENV': '"production"'
    }
});
