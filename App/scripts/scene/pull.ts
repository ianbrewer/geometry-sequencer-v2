// Usage: npm run scene:pull -- <project_id>
//
// Reads a project from Supabase and writes the full Project JSON to
// App/scenes/<project_id>.json. Edit that file freely, then push back
// with `npm run scene:push -- <project_id>`.

import { writeFileSync } from 'node:fs';
import { getArg, getAuthedClient, sceneFilePath } from './lib';

async function main() {
  const projectId = getArg(0, 'project_id');
  const { supabase, userId, mode } = await getAuthedClient();

  const query = supabase
    .from('projects')
    .select('id, name, data, folder_id, last_modified')
    .eq('id', projectId);

  const { data, error } = mode === 'service_role'
    ? await query.eq('user_id', userId).maybeSingle()
    : await query.maybeSingle();

  if (error) {
    console.error(`fetch failed: ${error.message}`);
    process.exit(1);
  }
  if (!data) {
    console.error(`no project with id ${projectId}`);
    process.exit(1);
  }

  // The full Project shape lives in `data`. Make sure the row's authoritative
  // fields (id, folderId) match what's in the JSON, then write it.
  const project = { ...(data.data ?? {}) };
  project.id = data.id;
  project.name = data.name;
  if (data.folder_id !== undefined) project.folderId = data.folder_id;
  if (data.last_modified) project.lastModified = data.last_modified;

  const path = sceneFilePath(projectId);
  writeFileSync(path, JSON.stringify(project, null, 2));
  console.log(path);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
