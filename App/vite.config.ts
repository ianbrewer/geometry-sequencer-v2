import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs';
import path from 'node:path';

// Helper to update index.json while preserving structure (folders, sort order)
const updateIndexJson = (projectsDir: string) => {
  try {
    const indexPath = path.join(projectsDir, 'index.json');
    let existingIndex: any = { folders: [], projects: [] };

    // Read existing index to preserve folders and metadata
    if (fs.existsSync(indexPath)) {
      try {
        const raw = fs.readFileSync(indexPath, 'utf-8');
        const parsed = JSON.parse(raw);
        // Handle migration from old array format
        if (Array.isArray(parsed)) {
          existingIndex.projects = parsed;
        } else {
          existingIndex = parsed;
        }
      } catch (e) {
        console.error('Failed to parse existing index.json', e);
      }
    }

    // Ensure structure
    if (!existingIndex.folders) existingIndex.folders = [];
    if (!existingIndex.projects) existingIndex.projects = [];

    // Scan disk
    const files = fs.readdirSync(projectsDir);
    const diskProjects = new Map();

    for (const file of files) {
      if (file.endsWith('.json') && file !== 'index.json') {
        try {
          const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
          const project = JSON.parse(content);
          diskProjects.set(project.id, {
            id: project.id,
            name: project.name,
            lastModified: project.lastModified || Date.now()
          });
        } catch (e) {
          console.error(`Error parsing ${file}`, e);
        }
      }
    }

    // Merge: Update existing entries, Add new ones, Remove deleted ones
    const newProjectList = [];
    const usedIds = new Set();

    // 1. Process existing entries (preserve order/folder)
    for (const existing of existingIndex.projects) {
      if (diskProjects.has(existing.id)) {
        const diskData = diskProjects.get(existing.id);
        newProjectList.push({
          ...existing, // Keep folderId, order
          name: diskData.name, // Update name from file
          lastModified: diskData.lastModified // Update time from file
        });
        usedIds.add(existing.id);
      }
      // If not on disk, it's deleted -> exclude it
    }

    // 2. Add new files found on disk but not in index
    for (const [id, data] of diskProjects) {
      if (!usedIds.has(id)) {
        newProjectList.push({
          ...data,
          folderId: null, // Default to root
          order: Date.now() // Default order key
        });
      }
    }

    // Sort new list by order? Or let client handle?
    // Let's just save valid list.
    const finalIndex = {
      folders: existingIndex.folders,
      projects: newProjectList
    };

    // Write only if changed
    const newContent = JSON.stringify(finalIndex, null, 2);
    const existingContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf-8') : '';

    if (newContent !== existingContent) {
      fs.writeFileSync(indexPath, newContent);
    }
    return finalIndex;
  } catch (err) {
    console.error('Failed to update index.json', err);
    return { folders: [], projects: [] };
  }
};

const persistencePlugin = (): Plugin => ({
  name: 'persistence-plugin',
  configureServer(server) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (!req.url?.startsWith('/api/projects') && !req.url?.startsWith('/api/index')) {
        return next();
      }

      const projectsDir = path.resolve(process.cwd(), 'public/projects');
      if (!fs.existsSync(projectsDir)) {
        fs.mkdirSync(projectsDir, { recursive: true });
      }

      // Handle GET /api/projects (list all)
      if (req.method === 'GET' && (req.url === '/api/projects' || req.url === '/api/index')) {
        // Update index.json and get list
        const projects = updateIndexJson(projectsDir);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(projects));
        return;
      }

      // Handle GET /api/projects/:id (get full)
      const match = req.url.match(/^\/api\/projects\/([^\/]+)$/);
      if (req.method === 'GET' && match) {
        const id = match[1];
        const filePath = path.join(projectsDir, `${id}.json`);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(content);
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Project not found' }));
        }
        return;
      }

      // Handle POST /api/projects (save)
      if (req.method === 'POST' && req.url === '/api/projects') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const project = JSON.parse(body);
            const filePath = path.join(projectsDir, `${project.id}.json`);
            fs.writeFileSync(filePath, JSON.stringify(project, null, 2));

            // Sync index.json
            updateIndexJson(projectsDir);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save project' }));
          }
        });
        return;
      }

      // Handle POST /api/index (save structure: folders, order)
      if (req.method === 'POST' && req.url === '/api/index') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const newIndex = JSON.parse(body);
            // Verify structure
            if (newIndex.folders && newIndex.projects) {
              const indexPath = path.join(projectsDir, 'index.json');
              fs.writeFileSync(indexPath, JSON.stringify(newIndex, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } else {
              throw new Error('Invalid index structure');
            }
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save index' }));
          }
        });
        return;
      }

      // Handle DELETE /api/projects/:id
      if (req.method === 'DELETE' && match) {
        const id = match[1];
        const filePath = path.join(projectsDir, `${id}.json`);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);

          // Sync index.json
          updateIndexJson(projectsDir);

          res.end(JSON.stringify({ success: true }));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Project not found' }));
        }
        return;
      }

      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), persistencePlugin()],
  server: {
    watch: {
      ignored: ['**/public/projects/**']
    }
  }
})
