import { Application } from 'pixi.js';
import { GeometryRenderer } from './rendering/GeometryRenderer';
import type { Project } from './types';

// Define the global namespace
declare global {
    interface Window {
        GeometryApp: {
            init: (containerId: string, projectData: Project) => void;
        }
    }
}

// Ensure namespace exists
window.GeometryApp = window.GeometryApp || {};

window.GeometryApp.init = async (containerId: string, project: Project) => {

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
