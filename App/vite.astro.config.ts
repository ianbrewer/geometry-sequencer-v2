import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite build config for the Astro symbol data bundle.
 * Produces public/astro-data.js — astrological symbol SVG paths.
 * 
 * Build: npx vite build --config vite.astro.config.ts
 */
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/astro-entry.ts'),
            name: 'AstroData',
            fileName: () => 'astro-data.js',
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
