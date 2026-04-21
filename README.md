# geometry-sequencer-v2

Version 2 of the Sacred Geometry Sequencer. Shares the Supabase backend (users, projects, folders) with v1 but iterates independently.

- v1 repo: https://github.com/ianbrewer/geometry-app-keyframes
- Schema and migrations are owned by the v1 repo — do not add a `supabase/migrations/` folder here.

## Setup

```
cd App
npm install
npm run dev
```

Requires environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`
