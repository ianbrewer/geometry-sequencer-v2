import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite build config for the Amino acid data bundle.
 * Produces public/amino-data.js — amino acid molecule SVG paths.
 * 
 * Build: npx vite build --config vite.amino.config.ts
 */
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/amino-entry.ts'),
            name: 'AminoData',
            fileName: () => 'amino-data.js',
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
