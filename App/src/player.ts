import { Application } from 'pixi.js';
import { GeometryRenderer } from './rendering/GeometryRenderer';
import { assetCache } from './rendering/AssetCache';
import type { Project } from './types';

// Asset registry shape produced by the exporter:
//   window.GEOMETRY_ASSETS = {
//     assets: { [assetId]: { url, mimeType } },
//     folders: { [folderId]: [assetId, ...] },  // ordered for asset_set cycling
//   }
// HTML exports point `url` at relative paths (./assets/<id>.<ext>); RN exports
// inline `url` as base64 data URLs since the WebView has no real filesystem.
type AssetRegistry = {
    assets?: Record<string, { url: string; mimeType: string }>;
    folders?: Record<string, string[]>;
};

// Define the global namespace
declare global {
    interface Window {
        GeometryApp: {
            init: (containerId: string, projectData: Project) => void;
        };
        GEOMETRY_ASSETS?: AssetRegistry;
    }
}

// Ensure namespace exists
window.GeometryApp = window.GeometryApp || {};

// Wire AssetCache to the embedded registry (idempotent — safe to call
// multiple times if the player init runs more than once on the page).
const wireAssetRegistry = () => {
    const registry = window.GEOMETRY_ASSETS;
    if (!registry || !registry.assets) return;

    assetCache.setUrlProvider(async (id) => {
        const entry = registry.assets?.[id];
        return entry ? { url: entry.url, mimeType: entry.mimeType } : null;
    });

    assetCache.setFolderAssetsProvider((folderId) => {
        if (!folderId) return [];
        const ids = registry.folders?.[folderId] || [];
        return ids
            .map((id) => {
                const a = registry.assets?.[id];
                return a ? { id, mimeType: a.mimeType } : null;
            })
            .filter((x): x is { id: string; mimeType: string } => x !== null);
    });
};

window.GeometryApp.init = async (containerId: string, project: Project) => {

    wireAssetRegistry();

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`GeometryApp: Container #${containerId} not found.`);
        return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 800;

    const app = new Application();

    await app.init({
        width,
        height,
        backgroundColor: project.backgroundColor || '#000000',
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
        preference: 'webgl',
        resizeTo: container // Auto-resize to container
    });

    container.appendChild(app.canvas);

    const renderer = new GeometryRenderer();

    // Start Animation Loop
    let startTime = Date.now();

    app.ticker.add(() => {
        // Calculate loop time
        const now = Date.now();
        const duration = project.duration || 10;
        const elapsed = (now - startTime) / 1000;
        const currentTime = elapsed % duration;

        if (app.renderer) {
            renderer.render(app, project, currentTime);
        }
    });

    // Handle Resize (if not using resizeTo, but resizeTo handles canvas size. 
    // We might need to handle logic if renderer needs explicit updates, 
    // but GeometryRenderer uses app.screen so it should be fine)
};
