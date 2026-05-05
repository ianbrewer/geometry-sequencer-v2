// Usage: npm run scene:push -- <project_id>
//
// Reads App/scenes/<project_id>.json and upserts it into Supabase. Works for
// both updates (project already exists) and creates (after `scene:new`).

import { readFileSync, existsSync } from 'node:fs';
import { getArg, getAuthedClient, sceneFilePath } from './lib';

async function main() {
  const projectId = getArg(0, 'project_id');
  const path = sceneFilePath(projectId);
  if (!existsSync(path)) {
    console.error(`scene file not found: ${path}`);
    process.exit(1);
  }

  const project = JSON.parse(readFileSync(path, 'utf8'));
  if (project.id !== projectId) {
    console.error(
      `id mismatch: file says ${project.id}, command expects ${projectId}. ` +
      `If you renamed the project id intentionally, rename the file too.`
    );
    process.exit(1);
  }
  if (!Array.isArray(project.layers)) {
    console.error(`scene is missing layers[]; refusing to push`);
    process.exit(1);
  }

  const { supabase, userId } = await getAuthedClient();
  const lastModified = Date.now();
  project.lastModified = lastModified;

  const row = {
    id: project.id,
    user_id: userId,
    name: project.name,
    data: project,
    last_modified: lastModified,
    folder_id: project.folderId ?? null,
    schema_version: 2,
  };

  // Try with schema_version first; if the column doesn't exist on this DB
  // (shared with v1, where the column may not have been added yet), retry
  // without it. CLAUDE.md says v2 rows *should* be 2, so we prefer to set it.
  let { error } = await supabase.from('projects').upsert(row);
  if (error && (error.code === '42703' || /schema_version/i.test(error.message))) {
    const { schema_version: _drop, ...without } = row;
    ({ error } = await supabase.from('projects').upsert(without));
    if (!error) {
      console.warn('warning: projects.schema_version column missing — pushed without it');
    }
  }

  if (error) {
    console.error(`upsert failed: ${error.message}`);
    process.exit(1);
  }

  console.log(`pushed ${project.id} (${project.layers.length} layers, ${project.duration}s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
