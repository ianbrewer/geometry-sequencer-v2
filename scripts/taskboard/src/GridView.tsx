import { useMemo, useState } from 'react'
import {
  DROPDOWNS,
  GROUPABLE_KEYS,
  LABELS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  type Task,
  type TaskKey,
} from './schema'

type SortDir = 'asc' | 'desc'

const COLS: { key: TaskKey; label: string; width?: string; editable?: boolean }[] = [
  { key: 'name', label: 'Name', width: '2.5fr', editable: true },
  { key: 'status', label: 'Status', width: '140px', editable: true },
  { key: 'priority', label: 'Priority', width: '110px', editable: true },
  { key: 'issue_type', label: 'Issue Type', width: '140px', editable: true },
  { key: 'app_section', label: 'App Section', width: '140px', editable: true },
  { key: 'owner', label: 'Owner', width: '140px', editable: true },
  { key: 'parent', label: 'Parent', width: '1fr' },
]

export default function GridView({
  tasks,
  groupBy,
  onGroupByChange,
  onPatch,
  onEdit,
}: {
  tasks: Task[]
  groupBy: TaskKey | ''
  onGroupByChange: (k: TaskKey | '') => void
  onPatch: (taskId: string, patch: Partial<Task>) => void
  onEdit: (t: Task) => void
}) {
  const [sortKey, setSortKey] = useState<TaskKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const cmp = (a: Task, b: Task): number => {
    const va = a[sortKey] ?? ''
    const vb = b[sortKey] ?? ''
    if (sortKey === 'priority') {
      const pa = PRIORITY_OPTIONS.indexOf(va as any)
      const pb = PRIORITY_OPTIONS.indexOf(vb as any)
      const fa = pa < 0 ? 99 : pa
      const fb = pb < 0 ? 99 : pb
      return sortDir === 'asc' ? fa - fb : fb - fa
    }
    if (sortKey === 'status') {
      const sa = STATUS_OPTIONS.indexOf(va as any)
      const sb = STATUS_OPTIONS.indexOf(vb as any)
      const fa = sa < 0 ? 99 : sa
      const fb = sb < 0 ? 99 : sb
      return sortDir === 'asc' ? fa - fb : fb - fa
    }
    const r = String(va).localeCompare(String(vb))
    return sortDir === 'asc' ? r : -r
  }

  const sorted = useMemo(() => [...tasks].sort(cmp), [tasks, sortKey, sortDir])

  const groups = useMemo(() => {
    if (!groupBy) return [{ key: '', label: 'All', items: sorted }]
    const m = new Map<string, Task[]>()
    for (const t of sorted) {
      const v = t[groupBy] || '—'
      if (!m.has(v)) m.set(v, [])
      m.get(v)!.push(t)
    }
    // Order groups by the schema options if applicable
    const opts = DROPDOWNS[groupBy] ?? []
    const ordered = [...opts, '—'].filter((k) => m.has(k)).map((k) => ({ key: k, label: k, items: m.get(k)! }))
    // Append any unknown keys
    for (const [k, items] of m) {
      if (!ordered.some((g) => g.key === k)) ordered.push({ key: k, label: k, items })
    }
    return ordered
  }, [sorted, groupBy])

  const handleHeaderClick = (k: TaskKey) => {
    if (sortKey === k) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else {
      setSortKey(k)
      setSortDir('asc')
    }
  }

  const gridTemplate = ['36px', ...COLS.map((c) => c.width ?? '1fr')].join(' ')

  const toggleComplete = (task: Task, checked: boolean) => {
    if (checked) {
      onPatch(task.task_id, {
        status: 'Completed',
        completed_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      })
    } else {
      onPatch(task.task_id, { status: 'New', completed_at: '' })
    }
  }

  return (
    <div className="grid">
      <div className="grid-toolbar">
        <label className="inline-field">
          <span>Group by:</span>
          <select value={groupBy} onChange={(e) => onGroupByChange(e.target.value as TaskKey | '')}>
            <option value="">(none)</option>
            {GROUPABLE_KEYS.map((k) => (
              <option key={k} value={k}>
                {LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid-scroll">
        <div className="grid-table" style={{ gridTemplateColumns: gridTemplate }}>
          <div className="grid-header-row" style={{ gridTemplateColumns: gridTemplate }}>
            <div className="grid-header grid-header-check" aria-label="Done" />
            {COLS.map((c) => (
              <button
                key={c.key}
                className={`grid-header ${sortKey === c.key ? 'sorted' : ''}`}
                onClick={() => handleHeaderClick(c.key)}
              >
                {c.label}
                {sortKey === c.key && <span className="sort-caret">{sortDir === 'asc' ? '▲' : '▼'}</span>}
              </button>
            ))}
          </div>

          {groups.map((g) => (
            <div key={g.key} className="grid-group">
              {groupBy && (
                <div className="grid-group-header">
                  <span className="grid-group-name">{g.label}</span>
                  <span className="grid-group-count">{g.items.length}</span>
                </div>
              )}
              {g.items.map((t) => {
                const done = t.status === 'Completed'
                return (
                  <div
                    key={t.task_id}
                    className={`grid-row ${done ? 'grid-row-done' : ''}`}
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    <div className="grid-cell grid-cell-check">
                      <label className="card-checkbox" title={done ? 'Mark incomplete' : 'Mark complete'}>
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={(e) => toggleComplete(t, e.target.checked)}
                        />
                        <span className="card-checkbox-box" />
                      </label>
                    </div>
                    {COLS.map((c) => (
                      <Cell
                        key={c.key}
                        task={t}
                        col={c.key}
                        editable={!!c.editable}
                        onPatch={onPatch}
                        onEdit={onEdit}
                      />
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Cell({
  task,
  col,
  editable,
  onPatch,
  onEdit,
}: {
  task: Task
  col: TaskKey
  editable: boolean
  onPatch: (taskId: string, patch: Partial<Task>) => void
  onEdit: (t: Task) => void
}) {
  const dropdownOptions = DROPDOWNS[col]
  const value = task[col] || ''

  if (col === 'name') {
    return (
      <div className="grid-cell grid-cell-name" onClick={() => onEdit(task)}>
        <span className="grid-name">{value || <em className="muted">(unnamed)</em>}</span>
      </div>
    )
  }

  if (dropdownOptions && editable) {
    return (
      <div className="grid-cell">
        <select
          className={`cell-select cell-select-${col}`}
          value={value}
          onChange={(e) => onPatch(task.task_id, { [col]: e.target.value } as Partial<Task>)}
        >
          <option value="">—</option>
          {dropdownOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return <div className="grid-cell">{value}</div>
}
