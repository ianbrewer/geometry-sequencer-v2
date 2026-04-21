import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite build config for the PixiJS bundle.
 * Produces public/pixi-bundle.js — the rendering engine library.
 * 
 * Build: npx vite build --config vite.pixi.config.ts
 */
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/pixi-entry.ts'),
            name: 'PixiBundle',
            fileName: () => 'pixi-bundle.js',
            formats: ['iife'],
        },
        outDir: 'public',
        emptyOutDir: false,
        minify: true,
    },
    define: {
        'process.env.NODE_ENV': '"production"'
    }
});
