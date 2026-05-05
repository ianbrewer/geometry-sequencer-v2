// Usage: npm run scene:list
//
// Lists the authenticated user's projects so you can grab an id for scene:pull.

import { getAuthedClient } from './lib';

async function main() {
  const { supabase, userId, mode } = await getAuthedClient();
  const query = supabase
    .from('projects')
    .select('id, name, last_modified, folder_id, data')
    .order('last_modified', { ascending: false });

  // In service-role mode we still scope to one user — the script's whole
  // mental model is "edit my projects."
  const { data, error } = mode === 'service_role'
    ? await query.eq('user_id', userId)
    : await query;

  if (error) {
    console.error(`fetch failed: ${error.message}`);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('(no projects)');
    return;
  }

  for (const row of data) {
    const layerCount = Array.isArray(row.data?.layers) ? row.data.layers.length : '?';
    const dur = row.data?.duration ?? '?';
    const when = row.last_modified
      ? new Date(row.last_modified).toISOString().slice(0, 16).replace('T', ' ')
      : '         ';
    console.log(`${row.id}\t${when}\t${layerCount} layers\t${dur}s\t${row.name}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
