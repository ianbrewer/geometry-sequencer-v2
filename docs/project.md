# Project: Geometry Sequencer v2

## What this is

v2 of the Sacred Geometry Sequencer — a browser-based animation sequencer for layered parametric shapes. Forked from v1 ([geometry-app-keyframes](https://github.com/ianbrewer/geometry-app-keyframes), live at https://geometrysequencer.vercel.app). v2 is live at https://geometry-sequencer-v2.vercel.app and shares v1's Supabase backend (project `ttalbvgdxtnyppighwgf`). Both apps run side-by-side until v1 retires.

## Active initiative: asset-based shapes rebuild

See [plan-asset-based-shapes.md](../plan-asset-based-shapes.md) for the full design.

**Problem:** The hardcoded icon sets (astrology/amino/I-Ching strokes) in the shape-type pulldown are inflexible. Users can't add their own series.

**Solution:** Collapse shape types into three buckets —
1. **Primitive** — math-driven shapes (polygon, star, circle, vesica, line, diamond, polyhedron, molecule).
2. **`asset_set`** — a user-uploaded folder of SVGs/PNGs/JPEGs, treated as an instance series with auto-count based on folder size.
3. **`asset_single`** — one uploaded image/SVG used as a single inner shape, tiled by the regular instance geometry controls.

Existing astrology/amino/iching layers get migrated into `asset_set` layers pointing at seed folders auto-created on first login.

## Stage roadmap

| Stage   | What                                                         | Branch                               | Status |
| ------- | ------------------------------------------------------------ | ------------------------------------ | ------ |
| Prereq  | SVG sanitization (DOMPurify) rolled into Stage A upload path | `feat/asset-store-stage-a`           | done (inline with A) |
| A       | Asset CRUD in the zustand store                              | `feat/asset-store-stage-a`           | in progress |
| B       | Asset library UI (Dashboard tab)                             | `feat/asset-library-ui-stage-b`      | pending |
| C       | `asset_set` / `asset_single` shape types + renderer          | `feat/asset-shapes-stage-c`          | pending |
| D       | Inspector asset picker                                       | `feat/asset-inspector-stage-d`       | pending |
| E       | Auto-layout on folder attach                                 | rolls into Stage D                   | pending |
| F       | Seed folders + project migration                             | `feat/asset-seed-migration-stage-f`  | pending |
| G       | Cleanup: retire legacy types + `custom`                      | `feat/asset-cleanup-stage-g`         | pending |

Branch naming: `feat/<slug>-stage-<letter>`. Each stage merges to `main` via PR.

## Decisions already made

- **Mixed PNG/SVG folders** — rejected. Upload surface refuses mixed-MIME folders with an error; a folder must be all-SVG or all-raster.
- **`custom` shape type** — retire during Stage G. Auto-convert remaining `custom` layers to `asset_single` on project load, creating an asset row for the pasted SVG.
- **Aspect ratio** — always respect original bounding boxes. No "force square" toggle; astrology's historical square-normalization is a legacy quirk and will be dropped as those layers migrate.

## Key pointers

- **v1 repo:** https://github.com/ianbrewer/geometry-app-keyframes
- **v2 live:** https://geometry-sequencer-v2.vercel.app
- **Supabase project:** `ttalbvgdxtnyppighwgf` (shared)
- **Schema ownership:** migrations live **only** in v1 repo at `App/supabase/migrations/`. Reference schema for asset work:
  - `20260421000001_asset_folders_and_assets.sql` — tables
  - `20260421000002_v2_user_assets_bucket.sql` — Storage bucket + RLS

## Schema cheatsheet (for app-side code)

**`asset_folders`**: `id uuid`, `user_id uuid`, `name text`, `is_open bool`, `sort_order int`, `created_at timestamptz`.

**`assets`**: `id uuid`, `user_id uuid`, `folder_id uuid (ON DELETE SET NULL)`, `name text`, `mime_type text`, `storage_path text`, `size_bytes bigint`, `width int`, `height int`, `created_at timestamptz`, `last_modified bigint`.

**Storage:** bucket `v2-user-assets`, private, 10MB cap, path `{user_id}/{asset_id}.{ext}`, allowed MIME `image/svg+xml`, `image/png`, `image/jpeg`, `text/plain`.

When a folder is deleted, its assets don't cascade — they orphan (`folder_id` nulls out). App code must offer a "delete assets too" option on folder deletion, mirroring the existing `deleteFolder(id, deleteProjects?)` pattern.
