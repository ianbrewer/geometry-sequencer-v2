// Usage: npm run scene:assets
//        npm run scene:assets -- <folder_id_or_name>
//
// With no args: lists asset folders and their asset counts.
// With a folder id or name: lists every asset in that folder
// (id, mime, dimensions, name) so you can wire ids into a layer's
// config.assetFolderId / config.assetId.

import { getAuthedClient } from './lib';

interface FolderRow { id: string; name: string; sort_order: number | null }
interface AssetRow {
  id: string;
  folder_id: string | null;
  name: string;
  mime_type: string;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
}

async function main() {
  const filter = process.argv[2];
  const { supabase, userId } = await getAuthedClient();

  const { data: folders, error: ferr } = await supabase
    .from('asset_folders')
    .select('id, name, sort_order')
    .eq('user_id', userId)
    .order('sort_order', { ascending: true });
  if (ferr) {
    console.error(`fetch folders failed: ${ferr.message}`);
    process.exit(1);
  }

  if (!filter) {
    // Folder summary view: count assets per folder + unfiled.
    const { data: counts, error: aerr } = await supabase
      .from('assets')
      .select('folder_id')
      .eq('user_id', userId);
    if (aerr) {
      console.error(`fetch assets failed: ${aerr.message}`);
      process.exit(1);
    }
    const byFolder = new Map<string | null, number>();
    for (const a of (counts as { folder_id: string | null }[] | null) ?? []) {
      byFolder.set(a.folder_id, (byFolder.get(a.folder_id) ?? 0) + 1);
    }
    for (const f of (folders as FolderRow[] | null) ?? []) {
      const n = byFolder.get(f.id) ?? 0;
      console.log(`${f.id}\t${n} assets\t${f.name}`);
    }
    const unfiled = byFolder.get(null) ?? 0;
    if (unfiled > 0) console.log(`(unfiled)\t${unfiled} assets\t—`);
    return;
  }

  const folder = (folders as FolderRow[] | null)?.find(
    (f) => f.id === filter || f.name === filter,
  );
  if (!folder) {
    console.error(`no folder matching "${filter}"`);
    process.exit(1);
  }

  const { data: assets, error: aerr } = await supabase
    .from('assets')
    .select('id, folder_id, name, mime_type, width, height, size_bytes')
    .eq('user_id', userId)
    .eq('folder_id', folder.id)
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('name', { ascending: true });
  if (aerr) {
    console.error(`fetch assets failed: ${aerr.message}`);
    process.exit(1);
  }

  console.log(`# folder: ${folder.name} (${folder.id})`);
  for (const a of (assets as AssetRow[] | null) ?? []) {
    const dims = a.width && a.height ? `${a.width}x${a.height}` : '—';
    console.log(`${a.id}\t${a.mime_type}\t${dims}\t${a.name}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
