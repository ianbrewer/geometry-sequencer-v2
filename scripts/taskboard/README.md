# Taskboard

Local self-hosted Airtable/Asana-style view over `tasks.tsv`.

## Run

```
cd scripts/taskboard
npm install    # first time only
npm run dev
```

Opens at http://127.0.0.1:3009.

## What it does

- **Reads and writes `tasks.tsv` directly** — the TSV at the repo root is the
  single source of truth. Every edit in the UI rewrites the file. Claude and
  the UI can work on the same file without a sync layer.
- **Kanban view** — columns are the Status values. Drag cards between columns
  to change status. Dragging into Completed auto-fills `completed_at`.
- **Grid view** — sortable headers, inline dropdown editors for
  Status/Priority/Issue Type/App Section/Owner, Group-by selector.
- **Filter bar** — search box (name/notes/id), per-field multi-select filter
  chips, and a "hide completed/cancelled" toggle.
- **Task editor** — click a card or the Name cell to open the editor.
  "+ New task" creates one with a local id.

## Schema

The option set lives in [src/schema.ts](src/schema.ts) and mirrors
[`scripts/tasks_schema.py`](../tasks_schema.py). If you add a new Status,
Priority, etc., update both.

## Regenerating the xlsx

The xlsx export is independent of this app:

```
python3 scripts/tasks_to_xlsx.py
```

## Ports

The main Vite app runs on 3008; this one uses 3009 so they can run side-by-side.
