# Process

How we ship work on v2. Short because the rules are short.

## Branching

One branch per stage of the active initiative. Naming: `feat/<slug>-stage-<letter>`. Current initiative and stages are tracked in [project.md](./project.md).

- Branch off `main` — never off another feature branch.
- Push the branch on first commit so progress is visible.
- Open a draft PR once the stage compiles + the golden-path manual test passes. Flip to ready when the stage is done.
- Squash-merge on approval. Delete the branch after merge.

Ad-hoc fixes unrelated to the active initiative go on `fix/<slug>` branches.

## Commits

- Follow the repo's existing style (see `git log` — short imperative first line, optional body).
- One logical change per commit where practical. Large store refactors bundled into one commit are fine if they only make sense together.
- Co-authored-by trailer is added automatically by Claude Code when Claude drives the commit.

## Schema changes

Migrations live **only** in the v1 repo at `App/supabase/migrations/`. Never add a `supabase/migrations/` folder in v2. To change schema:

1. Open a PR in v1 repo with the new migration.
2. From v1 repo `App/` dir: `supabase db push`.
3. Both apps see the change immediately (shared DB).

If a stage needs schema changes, land the v1 migration **before** starting the v2 branch.

## Tests / verification

No automated test suite today. Each stage's PR description must include:

- What changed
- Manual test plan (reproducible steps that exercise the change end-to-end in the running app)
- Screenshot or short screencap if the change is user-visible

For UI stages, run `npm run dev` from `App/` (Vite on :3008) and exercise the feature in a real browser before marking the PR ready.

## Definition of done (per stage)

- [ ] Code compiles (`npm run build` from `App/`)
- [ ] Lint clean (`npm run lint`)
- [ ] Golden-path manual test passes
- [ ] Docs updated if the contract changed (CLAUDE.md, project.md, or component-level docs)
- [ ] [TODO.md](../TODO.md) items the stage closes are moved to `## Done` with the PR/commit SHA
- [ ] New follow-ups discovered during the stage are appended to [TODO.md](../TODO.md)

## Agent handoff

Each stage has a self-contained prompt in [plan-asset-based-shapes.md § 6](../plan-asset-based-shapes.md). Use them verbatim when starting a fresh Claude session — the prompt should not depend on replaying the current session's context.

## Docs layout

- [project.md](./project.md) — the what and why
- [process.md](./process.md) — this file, the how
- [../plan-asset-based-shapes.md](../plan-asset-based-shapes.md) — the detailed plan for the active initiative
- [../TODO.md](../TODO.md) — running follow-ups, always check before starting work
- [../CLAUDE.md](../CLAUDE.md) — agent-facing repo rules; must stay accurate
