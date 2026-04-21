# v2 Follow-ups

Running list of v2 work items identified during setup/iteration. Keep this alphabetical under each section — newest-first lists go stale fast.

## Open

### Asset-based shapes rebuild (active initiative)

See [plan-asset-based-shapes.md](./plan-asset-based-shapes.md) and [docs/project.md](./docs/project.md).

- [ ] **Stage A — Asset CRUD store layer** — `feat/asset-store-stage-a`. Add `asset_folders` + `assets` actions to `App/src/store/useStore.ts`; DOMPurify SVG sanitization in the upload path.
- [ ] **Stage B — Asset Library UI** — `feat/asset-library-ui-stage-b`. New Dashboard tab, drag-drop folder upload, thumbnail grid.
- [ ] **Stage C — `asset_set` / `asset_single` shape types + renderer** — `feat/asset-shapes-stage-c`. New ShapeType values, AssetCache, Pixi Sprite rendering for rasters.
- [ ] **Stage D — Inspector asset picker (+ Stage E auto-layout)** — `feat/asset-inspector-stage-d`. Replace the astrology/amino/iching pulldown options with asset picker; apply radial-vs-linear defaults based on folder size.
- [ ] **Stage F — Seed folders + project migration** — `feat/asset-seed-migration-stage-f`. Seed Astrology / Amino Acids / I-Ching Strokes folders on first login; rewrite legacy layer types to `asset_set` on project load.
- [ ] **Stage G — Cleanup: retire legacy types + `custom`** — `feat/asset-cleanup-stage-g`. After Supabase audit confirms no legacy rows, delete astrology/amino/iching_lines branches and `custom` type; auto-convert remaining `custom` layers to `asset_single`.

### Cross-cutting

- [ ] **Asset output optimizer** — before upload, compress SVGs (SVGO), PNGs (pngquant or sharp), JPEGs (mozjpeg). Client-side before upload, or an edge function on upload. The 10MB bucket cap is the ceiling, not a target; aim for ~200KB steady-state for most user assets.
- [ ] **Asset copy on project share / transfer** — project rows reference `asset` IDs owned by the original user. Storage RLS enforces `first path segment = auth.uid()`, so the receiving user can't read the original blobs. When a project moves between users (share, duplicate-across-accounts, admin reassign), each referenced asset needs to be copied into the target user's space: new `asset_folders` / `assets` rows, new storage object at `{new_user_id}/{new_asset_id}.{ext}`, and every `assetFolderId` / `assetId` in the project's layers rewritten to point at the new ids. Consider an edge function that takes a project id + target user id and does the full clone in one shot.
- [ ] **Auth `redirectTo` on v2 password reset** — `App/src/components/AuthModal.tsx` calls `supabase.auth.resetPasswordForEmail(email)` with no `redirectTo`, so reset emails use the Supabase Site URL (pointed at v1). Pass `{ redirectTo: window.location.origin }` so v2-initiated resets land back on v2.
- [ ] **Legacy shape-type code removal audit** — after Stage F lands, query Supabase to confirm zero rows in `projects.layers` still reference `astrology` / `amino` / `iching_lines`. Once clean, Stage G can delete the legacy code paths.
- [ ] **v1 filter for `schema_version`** — once v2 starts writing rows with `schema_version = 2`, v1's project list should filter to `schema_version = 1 OR schema_version IS NULL` in `useStore.ts` → `fetchProjects`. Otherwise v1 will try to render v2 data and crash or misbehave.

## Done

<!-- Move items here when completed; include the PR or commit SHA for context -->
- [x] **SVG sanitization on upload** — DOMPurify-backed `sanitizeSvgFile` gates every SVG upload in the Stage A store (`uploadAsset`). (Branch `feat/asset-store-stage-a`.)
