# geometry-sequencer-v2

v2 of Sacred Geometry Sequencer — parallel app sharing v1's Supabase backend (users, projects). v1 will eventually retire; until then both run side-by-side.

## Key pointers

- **v1 repo:** https://github.com/ianbrewer/geometry-app-keyframes
- **v1 live:** https://geometrysequencer.vercel.app
- **v2 live:** https://geometry-sequencer-v2.vercel.app
- **Supabase project:** `ttalbvgdxtnyppighwgf` (shared with v1)
- **Follow-ups:** [TODO.md](./TODO.md) — check before starting new work; append there when tasks get deferred

## Critical: schema ownership

Migrations live **only** in the v1 repo at `App/supabase/migrations/`. Never add a `supabase/migrations/` folder here. For any schema change:

1. Open a PR in the v1 repo adding the migration file.
2. From v1 repo's `App/` directory: `supabase db push`.
3. Both apps see the change (shared DB).

Running `supabase db push` from this repo would do nothing useful and could confuse the tracking table.

## Shared backend conventions

- **`projects.schema_version`** — v1 rows are `1`, v2 rows should be `2`. v1 doesn't yet filter on this (tracked in TODO.md); until it does, be careful not to write v2-shaped data to rows v1 will try to render.
- **`asset_folders` + `assets`** tables — v2-only. Flat folder structure. Metadata only; blob lives in Storage.
- **Storage bucket `v2-user-assets`** — private, 10MB cap, MIME allowlist (`image/svg+xml`, `image/png`, `image/jpeg`, `text/plain`). Path convention: `{user_id}/{asset_id}.{ext}`. RLS enforces first path segment = `auth.uid()`.
- **`profiles`** (with `is_admin` flag) — shared with v1. Admin policies already exist on all tables.
- **Project `id`** — `text` column, not DB-generated. v2 should prefix IDs (e.g. `v2_<uuid>`) to make eventual migration from v1 trivial (`WHERE id LIKE 'v2_%'`).

## Auth

Supabase Site URL points at v1 (`geometrysequencer.vercel.app`). Both v1 and v2 URLs are in the redirect allowlist. **Any v2 auth call that sends an email must pass `redirectTo: window.location.origin`** — otherwise the email link goes to v1. Password reset in `App/src/components/AuthModal.tsx` currently doesn't; that's in TODO.md.

Anon key + URL come from env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`); no hardcoded fallback. If you run locally, create `App/.env.local` with both.

## Dev

```
cd App
npm install
npm run dev     # Vite on port 3008
```

Build commands in `App/package.json` include multiple `build:*` scripts for separate bundles (player, pixi, astro, amino) — inherited from v1.
