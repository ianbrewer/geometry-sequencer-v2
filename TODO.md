# v2 Follow-ups

Running list of v2 work items identified during setup/iteration. Keep this alphabetical under each section — newest-first lists go stale fast.

## Open

- [ ] **Asset output optimizer** — before upload, compress SVGs (SVGO), PNGs (pngquant or sharp), JPEGs (mozjpeg). Client-side before upload, or an edge function on upload. The 10MB bucket cap is the ceiling, not a target; aim for ~200KB steady-state for most user assets.
- [ ] **Auth `redirectTo` on v2 password reset** — `App/src/components/AuthModal.tsx` calls `supabase.auth.resetPasswordForEmail(email)` with no `redirectTo`, so reset emails use the Supabase Site URL (pointed at v1). Pass `{ redirectTo: window.location.origin }` so v2-initiated resets land back on v2.
- [ ] **v1 filter for `schema_version`** — once v2 starts writing rows with `schema_version = 2`, v1's project list should filter to `schema_version = 1 OR schema_version IS NULL` in `useStore.ts` → `fetchProjects`. Otherwise v1 will try to render v2 data and crash or misbehave.
- [ ] **SVG sanitization on upload** — SVGs can embed `<script>` tags. Before saving to Storage, pass through DOMPurify (or equivalent) to strip executable content. Stored XSS vector if rendered inline without this.

## Done

<!-- Move items here when completed; include the PR or commit SHA for context -->
