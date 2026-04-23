"""Shared schema for the in-repo task list.

Canonical source: `tasks.tsv` at the repo root (tab-separated, one row per task,
embedded newlines in Notes are escaped as literal `\\n` so every task stays on a
single line for clean diffs and grep).

Human-facing view: `Task list.xlsx`, regenerated from `tasks.tsv` with dropdown
validations for the option columns below.
"""
from __future__ import annotations

from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TSV_PATH = REPO_ROOT / "tasks.tsv"
XLSX_PATH = REPO_ROOT / "Task list.xlsx"
DRAFT_XLSX_PATH = REPO_ROOT / "Draft task list.xlsx"

COLUMNS = [
    "task_id",
    "name",
    "status",
    "priority",
    "issue_type",
    "app_section",
    "owner",
    "parent",
    "notes",
    "created_at",
    "completed_at",
]

STATUS_OPTIONS = [
    "New",
    "Backlog",
    "Do Next",
    "In Progress",
    "Research & Plan",
    "Need Testing",
    "Completed",
    "Cancelled",
    "Future Upgrades",
]
PRIORITY_OPTIONS = ["Critical", "High", "Medium", "Low"]
ISSUE_TYPE_OPTIONS = ["Bug", "UX/UI", "Technical Debt", "Feature Request", "Ideas"]
APP_SECTION_OPTIONS = [
    "General",
    "Animation Variables",
    "Timeline",
    "Canvas",
    "File System",
    "Front Page",
    "Exporters",
]
OWNER_OPTIONS = ["Unassigned", "Alexa", "Gustavo & Team"]

DROPDOWNS = {
    "status": STATUS_OPTIONS,
    "priority": PRIORITY_OPTIONS,
    "issue_type": ISSUE_TYPE_OPTIONS,
    "app_section": APP_SECTION_OPTIONS,
    "owner": OWNER_OPTIONS,
}


def escape_tsv(value: str) -> str:
    """Escape tabs and newlines so each task stays on a single TSV line."""
    return value.replace("\\", "\\\\").replace("\t", "\\t").replace("\r\n", "\n").replace("\n", "\\n")


def unescape_tsv(value: str) -> str:
    out = []
    i = 0
    while i < len(value):
        c = value[i]
        if c == "\\" and i + 1 < len(value):
            nxt = value[i + 1]
            if nxt == "n":
                out.append("\n")
                i += 2
                continue
            if nxt == "t":
                out.append("\t")
                i += 2
                continue
            if nxt == "\\":
                out.append("\\")
                i += 2
                continue
        out.append(c)
        i += 1
    return "".join(out)


def read_tsv(path: Path = TSV_PATH) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8") as f:
        lines = f.read().splitlines()
    if not lines:
        return []
    header = lines[0].split("\t")
    if header != COLUMNS:
        raise ValueError(f"tasks.tsv header mismatch. Got {header}, expected {COLUMNS}")
    rows = []
    for raw in lines[1:]:
        if not raw.strip():
            continue
        parts = raw.split("\t")
        # pad short rows
        parts += [""] * (len(COLUMNS) - len(parts))
        rows.append({col: unescape_tsv(parts[i]) for i, col in enumerate(COLUMNS)})
    return rows


def write_tsv(rows: list[dict[str, str]], path: Path = TSV_PATH) -> None:
    lines = ["\t".join(COLUMNS)]
    for r in rows:
        lines.append("\t".join(escape_tsv(str(r.get(col, "") or "")) for col in COLUMNS))
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def sort_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    """Active work first, then completed/cancelled. Ties break on priority, section, name."""
    status_rank = {s: i for i, s in enumerate(STATUS_OPTIONS)}
    priority_rank = {p: i for i, p in enumerate(PRIORITY_OPTIONS)}
    return sorted(
        rows,
        key=lambda r: (
            status_rank.get(r.get("status", ""), 99),
            priority_rank.get(r.get("priority", ""), 99),
            r.get("app_section", "") or "zzz",
            r.get("name", ""),
        ),
    )
