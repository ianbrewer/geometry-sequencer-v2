import { useEffect, useMemo, useState } from 'react'
import { loadTasks, saveTasks } from './api'
import {
  DROPDOWNS,
  GROUPABLE_KEYS,
  LABELS,
  STATUS_OPTIONS,
  emptyTask,
  type Task,
  type TaskKey,
} from './schema'
import KanbanView from './KanbanView'
import GridView from './GridView'

type View = 'kanban' | 'grid'

const statusRank: Record<string, number> = Object.fromEntries(
  STATUS_OPTIONS.map((s, i) => [s, i]),
)

function sortTasks(tasks: Task[]): Task[] {
  const priorityRank: Record<string, number> = {
    Critical: 0,
    High: 1,
    Medium: 2,
    Low: 3,
  }
  return [...tasks].sort((a, b) => {
    const sa = statusRank[a.status] ?? 99
    const sb = statusRank[b.status] ?? 99
    if (sa !== sb) return sa - sb
    const pa = priorityRank[a.priority] ?? 99
    const pb = priorityRank[b.priority] ?? 99
    if (pa !== pb) return pa - pb
    return (a.name || '').localeCompare(b.name || '')
  })
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [view, setView] = useState<View>(
    () => (localStorage.getItem('tb_view') as View) || 'kanban',
  )
  const [editing, setEditing] = useState<Task | null>(null)
  const [filters, setFilters] = useState<Partial<Record<TaskKey, Set<string>>>>({})
  const [search, setSearch] = useState('')
  const [hideCompleted, setHideCompleted] = useState(true)
  const [kanbanGroupBy, setKanbanGroupBy] = useState<TaskKey>(
    () => (localStorage.getItem('tb_kanban_group_by') as TaskKey) || 'status',
  )
  const [gridGroupBy, setGridGroupBy] = useState<TaskKey | ''>(
    () => (localStorage.getItem('tb_grid_group_by') as TaskKey | '') ?? 'status',
  )

  useEffect(() => {
    localStorage.setItem('tb_view', view)
  }, [view])
  useEffect(() => {
    localStorage.setItem('tb_kanban_group_by', kanbanGroupBy)
  }, [kanbanGroupBy])
  useEffect(() => {
    localStorage.setItem('tb_grid_group_by', gridGroupBy)
  }, [gridGroupBy])

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const t = await loadTasks()
      setTasks(t)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const persist = async (next: Task[]) => {
    setTasks(next)
    setSaving(true)
    try {
      await saveTasks(sortTasks(next))
    } catch (e) {
      setError(String(e))
    } finally {
      setSaving(false)
    }
  }

  const patchTask = (taskId: string, patch: Partial<Task>) => {
    const next = tasks.map((t) => (t.task_id === taskId ? { ...t, ...patch } : t))
    persist(next)
  }

  const upsertTask = (task: Task) => {
    const exists = tasks.some((t) => t.task_id === task.task_id)
    const next = exists
      ? tasks.map((t) => (t.task_id === task.task_id ? task : t))
      : [...tasks, task]
    persist(next)
  }

  const deleteTask = (taskId: string) => {
    persist(tasks.filter((t) => t.task_id !== taskId))
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks.filter((t) => {
      if (hideCompleted && (t.status === 'Completed' || t.status === 'Cancelled')) {
        return false
      }
      if (
        q &&
        !t.name.toLowerCase().includes(q) &&
        !t.notes.toLowerCase().includes(q) &&
        !t.task_id.toLowerCase().includes(q)
      ) {
        return false
      }
      for (const [k, set] of Object.entries(filters)) {
        if (set && set.size > 0 && !set.has(t[k as TaskKey])) return false
      }
      return true
    })
  }, [tasks, filters, search, hideCompleted])

  if (loading) return <div className="loading">Loading tasks…</div>

  return (
    <div className="app">
      <header className="topbar">
        <div className="title">
          <span className="title-main">Geometry Sequencer Tasks</span>
          <span className="title-sub">{filtered.length} of {tasks.length}</span>
          {saving && <span className="saving">saving…</span>}
          {error && <span className="error">{error}</span>}
        </div>
        <div className="topbar-right">
          <div className="view-switch">
            <button
              className={view === 'kanban' ? 'active' : ''}
              onClick={() => setView('kanban')}
            >
              Kanban
            </button>
            <button
              className={view === 'grid' ? 'active' : ''}
              onClick={() => setView('grid')}
            >
              Grid
            </button>
          </div>
          <button className="btn-secondary" onClick={refresh} title="Re-read tasks.tsv from disk">
            Refresh
          </button>
          <button
            className="btn-primary"
            onClick={() => setEditing(emptyTask())}
          >
            + New task
          </button>
        </div>
      </header>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
      />
      <main className="main">
        {view === 'kanban' ? (
          <KanbanView
            tasks={filtered}
            groupBy={kanbanGroupBy}
            onGroupByChange={setKanbanGroupBy}
            onPatch={patchTask}
            onEdit={setEditing}
          />
        ) : (
          <GridView
            tasks={filtered}
            groupBy={gridGroupBy}
            onGroupByChange={setGridGroupBy}
            onPatch={patchTask}
            onEdit={setEditing}
          />
        )}
      </main>
      {editing && (
        <TaskEditor
          task={editing}
          isNew={!tasks.some((t) => t.task_id === editing.task_id)}
          onClose={() => setEditing(null)}
          onSave={(t) => {
            upsertTask(t)
            setEditing(null)
          }}
          onDelete={() => {
            deleteTask(editing.task_id)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}

function FilterBar({
  filters,
  setFilters,
  search,
  setSearch,
  hideCompleted,
  setHideCompleted,
}: {
  filters: Partial<Record<TaskKey, Set<string>>>
  setFilters: React.Dispatch<React.SetStateAction<Partial<Record<TaskKey, Set<string>>>>>
  search: string
  setSearch: (v: string) => void
  hideCompleted: boolean
  setHideCompleted: (v: boolean) => void
}) {
  const toggle = (key: TaskKey, value: string) => {
    setFilters((prev) => {
      const next = { ...prev }
      const current = new Set(next[key] ?? [])
      if (current.has(value)) current.delete(value)
      else current.add(value)
      if (current.size === 0) delete next[key]
      else next[key] = current
      return next
    })
  }
  const clear = () => setFilters({})
  const anyActive = Object.values(filters).some((s) => s && s.size > 0)
  return (
    <div className="filterbar">
      <input
        className="search"
        placeholder="Search name, notes, id…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="toggle">
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) => setHideCompleted(e.target.checked)}
        />
        Hide completed/cancelled
      </label>
      {GROUPABLE_KEYS.map((key) => (
        <FilterDropdown
          key={key}
          label={LABELS[key]}
          options={DROPDOWNS[key] ?? []}
          selected={filters[key] ?? new Set()}
          onToggle={(v) => toggle(key, v)}
        />
      ))}
      {anyActive && (
        <button className="btn-ghost" onClick={clear}>
          Clear filters
        </button>
      )}
    </div>
  )
}

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: readonly string[]
  selected: Set<string>
  onToggle: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const count = selected.size
  return (
    <div className={`filter-dropdown ${open ? 'open' : ''}`}>
      <button className="filter-button" onClick={() => setOpen((v) => !v)}>
        {label}
        {count > 0 && <span className="filter-count">{count}</span>}
      </button>
      {open && (
        <div className="filter-menu" onMouseLeave={() => setOpen(false)}>
          {options.map((opt) => (
            <label key={opt} className="filter-item">
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => onToggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function TaskEditor({
  task,
  isNew,
  onClose,
  onSave,
  onDelete,
}: {
  task: Task
  isNew: boolean
  onClose: () => void
  onSave: (t: Task) => void
  onDelete: () => void
}) {
  const [draft, setDraft] = useState<Task>(task)
  const set = <K extends TaskKey>(key: K, value: string) =>
    setDraft((d) => ({ ...d, [key]: value }))
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{isNew ? 'New task' : 'Edit task'}</h2>
          <button className="btn-ghost" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="modal-body">
          <label className="field">
            <span>Name</span>
            <input
              autoFocus
              value={draft.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </label>
          <div className="row">
            <label className="field">
              <span>Status</span>
              <select value={draft.status} onChange={(e) => set('status', e.target.value)}>
                {DROPDOWNS.status.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Priority</span>
              <select value={draft.priority} onChange={(e) => set('priority', e.target.value)}>
                <option value="">—</option>
                {DROPDOWNS.priority.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="row">
            <label className="field">
              <span>Issue type</span>
              <select value={draft.issue_type} onChange={(e) => set('issue_type', e.target.value)}>
                <option value="">—</option>
                {DROPDOWNS.issue_type.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>App section</span>
              <select
                value={draft.app_section}
                onChange={(e) => set('app_section', e.target.value)}
              >
                <option value="">—</option>
                {DROPDOWNS.app_section.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Owner</span>
              <select value={draft.owner} onChange={(e) => set('owner', e.target.value)}>
                {DROPDOWNS.owner.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="field">
            <span>Parent task</span>
            <input value={draft.parent} onChange={(e) => set('parent', e.target.value)} />
          </label>
          <label className="field">
            <span>Notes</span>
            <textarea
              rows={10}
              value={draft.notes}
              onChange={(e) => set('notes', e.target.value)}
            />
          </label>
          <div className="meta">
            <span>ID: {draft.task_id}</span>
            {draft.created_at && <span>Created: {draft.created_at}</span>}
            {draft.completed_at && <span>Completed: {draft.completed_at}</span>}
          </div>
        </div>
        <footer className="modal-footer">
          {!isNew && (
            <button
              className="btn-danger"
              onClick={() => {
                if (confirm(`Delete "${task.name || task.task_id}"?`)) onDelete()
              }}
            >
              Delete
            </button>
          )}
          <div className="spacer" />
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={() => onSave(draft)}>
            Save
          </button>
        </footer>
      </div>
    </div>
  )
}
