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
- [ ] **Stage H — Optional vector rendering for SVG assets** — `feat/asset-vector-mode-stage-h`. Per-layer opt-in to true vector rendering for close-up/hero layers where the 4× raster starts to soften.
    - **Config:** add `vectorAsset?: boolean` to `LayerConfig` (default false). Applies only when the layer's resolved asset is `image/svg+xml`; PNG/JPEG ignore the flag.
    - **AssetCache:** split the cache into two maps keyed on `(assetId, mode)` where `mode ∈ {'texture', 'vector'}`. Add `getGraphicsContextSync(assetId): GraphicsContext | null` that loads via `Assets.load({ src, data: { parseAsGraphicsContext: true } })`. `invalidate(assetId)` clears both modes. Keep `getTextureSync` unchanged so the default fast path is untouched.
    - **Renderer:** in the `asset_set` / `asset_single` branch, if `effectiveConfig.vectorAsset && folderAssetEntry.mimeType === 'image/svg+xml'`, request the GraphicsContext and build `new Graphics(ctx)` instead of `new Sprite(texture)`. Size via `graphics.getLocalBounds()` to compute the same `targetMax / maxBound` scale we currently apply to sprites. If the ctx is still loading or unavailable, fall back silently to the sprite path.
    - **Inspector:** toggle next to the asset picker (Stage D UI). Only render the toggle when the current asset's mime is `image/svg+xml`. Label something like "Crisp at any scale (vector)". Inline helper text: "Slower with many instances."
    - **Perf guardrail:** soft-warn (small text under the toggle) when `instances * symmetryMultiplier > 24`. No hard block — user decision.
    - **Migration:** none needed. New optional field, defaults false, no existing rows affected.
    - **Out of scope:** per-instance mode switching, or auto-promoting to vector at high zoom. Keep the flag static per layer.

### Cross-cutting

- [ ] **Asset output optimizer** — before upload, compress SVGs (SVGO), PNGs (pngquant or sharp), JPEGs (mozjpeg). Client-side before upload, or an edge function on upload. The 10MB bucket cap is the ceiling, not a target; aim for ~200KB steady-state for most user assets.
- [ ] **Auth `redirectTo` on v2 password reset** — `App/src/components/AuthModal.tsx` calls `supabase.auth.resetPasswordForEmail(email)` with no `redirectTo`, so reset emails use the Supabase Site URL (pointed at v1). Pass `{ redirectTo: window.location.origin }` so v2-initiated resets land back on v2.
- [ ] **Legacy shape-type code removal audit** — after Stage F lands, query Supabase to confirm zero rows in `projects.layers` still reference `astrology` / `amino` / `iching_lines`. Once clean, Stage G can delete the legacy code paths.
- [ ] **SVG sanitization on upload** — SVGs can embed `<script>` tags. Before saving to Storage, pass through DOMPurify (or equivalent) to strip executable content. Stored XSS vector if rendered inline without this. _Scheduled inside Stage A — move to Done when Stage A ships._
- [ ] **v1 filter for `schema_version`** — once v2 starts writing rows with `schema_version = 2`, v1's project list should filter to `schema_version = 1 OR schema_version IS NULL` in `useStore.ts` → `fetchProjects`. Otherwise v1 will try to render v2 data and crash or misbehave.

## Done

<!-- Move items here when completed; include the PR or commit SHA for context -->
