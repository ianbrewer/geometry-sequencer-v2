"""One-shot seeder: build tasks.tsv from an Asana export (Draft task list.xlsx).

Keep this around in case you re-export from Asana and want to reseed. Running
it will OVERWRITE tasks.tsv, so commit anything you want to keep first.

Usage: python3 scripts/seed_from_asana_draft.py
"""
from __future__ import annotations

import sys

import openpyxl

from tasks_schema import (
    APP_SECTION_OPTIONS,
    COLUMNS,
    DRAFT_XLSX_PATH,
    ISSUE_TYPE_OPTIONS,
    PRIORITY_OPTIONS,
    TSV_PATH,
    sort_rows,
    write_tsv,
)

# Maps Asana's "Progress" values to (Status, Owner) in our schema.
PROGRESS_MAP = {
    "New Issues": ("New", "Unassigned"),
    "In Progress": ("In Progress", "Unassigned"),
    "Research & Plan": ("Research & Plan", "Unassigned"),
    "Need Testing": ("Need Testing", "Unassigned"),
    "Completed": ("Completed", "Unassigned"),
    "Cancelled": ("Cancelled", "Unassigned"),
    "Future Upgrades": ("Future Upgrades", "Unassigned"),
    "Alexa Bug": ("New", "Alexa"),
    "Gustavo and team Bugs": ("New", "Gustavo & Team"),
}
APP_SECTION_MAP = {s: s for s in APP_SECTION_OPTIONS}
APP_SECTION_MAP["Canvas (new)"] = "Canvas"

ISSUE_TYPE_MAP = {s: s for s in ISSUE_TYPE_OPTIONS}
ISSUE_TYPE_MAP["UX/UI "] = "UX/UI"
# Asana used "Enhancement"; we renamed it to "Ideas".
ISSUE_TYPE_MAP["Enhancement"] = "Ideas"


def clean(v):
    if v is None:
        return ""
    if isinstance(v, str):
        return v.strip()
    return v


def main():
    if not DRAFT_XLSX_PATH.exists():
        sys.exit(f"Missing {DRAFT_XLSX_PATH}. Drop the Asana export there first.")

    wb = openpyxl.load_workbook(DRAFT_XLSX_PATH, data_only=True)
    ws = wb.active

    # Asana column layout: A=TaskID, B=Created, C=Completed, E=Name, L=Notes,
    # N=ParentTask, Q=Priority, R=IssueType, S=AppSection, U=Progress.
    rows = []
    for row in ws.iter_rows(min_row=4, values_only=False):
        name = clean(row[4].value)
        if not name or not str(name).strip():
            continue

        progress_raw = clean(row[20].value)
        status, owner = PROGRESS_MAP.get(progress_raw, ("New", "Unassigned"))
        completed_at = row[2].value
        if completed_at and status not in ("Completed", "Cancelled"):
            status = "Completed"

        priority = clean(row[16].value)
        if priority not in PRIORITY_OPTIONS:
            priority = ""

        issue_type_raw = clean(row[17].value)
        issue_type = ISSUE_TYPE_MAP.get(issue_type_raw, "")
        app_section_raw = clean(row[18].value)
        app_section = APP_SECTION_MAP.get(app_section_raw, "")

        def date_str(v):
            return v.isoformat(sep=" ", timespec="seconds") if v else ""

        rec = {col: "" for col in COLUMNS}
        rec.update({
            "task_id": clean(row[0].value),
            "name": name,
            "status": status,
            "priority": priority,
            "issue_type": issue_type,
            "app_section": app_section,
            "owner": owner,
            "parent": clean(row[13].value),
            "notes": clean(row[11].value),
            "created_at": date_str(row[1].value),
            "completed_at": date_str(completed_at),
        })
        rows.append(rec)

    rows = sort_rows(rows)
    write_tsv(rows)
    print(f"Wrote {TSV_PATH} ({len(rows)} tasks)")


if __name__ == "__main__":
    main()
