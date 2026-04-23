import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useMemo, useState } from 'react'
import {
  DROPDOWNS,
  GROUPABLE_KEYS,
  LABELS,
  STATUS_OPTIONS,
  type Task,
  type TaskKey,
} from './schema'

const UNSET_ID = '__unset__'

export default function KanbanView({
  tasks,
  groupBy,
  onGroupByChange,
  onPatch,
  onEdit,
}: {
  tasks: Task[]
  groupBy: TaskKey
  onGroupByChange: (k: TaskKey) => void
  onPatch: (taskId: string, patch: Partial<Task>) => void
  onEdit: (t: Task) => void
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )
  const [activeId, setActiveId] = useState<string | null>(null)

  const options = (DROPDOWNS[groupBy] ?? []) as readonly string[]
  // For Status, every task has a value (defaults to 'New'); for others, show an unset column only if any task is unset.
  const columns = useMemo(() => {
    const cols = options.map((value) => ({ id: value, label: value, value }))
    const hasUnset = tasks.some((t) => !t[groupBy])
    if (groupBy !== 'status' && hasUnset) {
      cols.push({ id: UNSET_ID, label: '(none)', value: '' })
    }
    return cols
  }, [options, tasks, groupBy])

  const byGroup = new Map<string, Task[]>()
  for (const col of columns) byGroup.set(col.id, [])
  for (const t of tasks) {
    const raw = t[groupBy] || ''
    if (groupBy === 'status') {
      const value = (STATUS_OPTIONS as readonly string[]).includes(raw) ? raw : 'New'
      byGroup.get(value)!.push(t)
      continue
    }
    const colId = raw && options.includes(raw) ? raw : UNSET_ID
    const bucket = byGroup.get(colId)
    if (bucket) bucket.push(t)
    else byGroup.set(colId, [t]) // defensive fallback
  }

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = e
    if (!over) return
    const overId = String(over.id)
    const targetCol = columns.find((c) => c.id === overId)
    if (!targetCol) return
    const task = tasks.find((t) => t.task_id === active.id)
    if (!task) return
    const newValue = targetCol.value
    if ((task[groupBy] || '') === newValue) return
    const patch: Partial<Task> = { [groupBy]: newValue } as Partial<Task>
    if (groupBy === 'status') {
      if (newValue === 'Completed' && !task.completed_at) {
        patch.completed_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
      } else if (newValue !== 'Completed' && newValue !== 'Cancelled') {
        patch.completed_at = ''
      }
    }
    onPatch(task.task_id, patch)
  }

  const activeTask = tasks.find((t) => t.task_id === activeId)

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
    <div className="kanban-wrapper">
      <div className="kanban-toolbar">
        <label className="inline-field">
          <span>Group by:</span>
          <select
            value={groupBy}
            onChange={(e) => onGroupByChange(e.target.value as TaskKey)}
          >
            {GROUPABLE_KEYS.map((k) => (
              <option key={k} value={k}>
                {LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="kanban">
          {columns.map((col) => {
            const items = byGroup.get(col.id) ?? []
            return (
              <DroppableColumn key={col.id} id={col.id}>
                <header className="kanban-col-header">
                  <GroupDot groupBy={groupBy} value={col.value} />
                  <span className="kanban-col-name">{col.label}</span>
                  <span className="kanban-col-count">{items.length}</span>
                </header>
                <div className="kanban-col-body">
                  {items.map((t) => (
                    <DraggableCard
                      key={t.task_id}
                      task={t}
                      onEdit={onEdit}
                      onToggleComplete={toggleComplete}
                    />
                  ))}
                  {items.length === 0 && <div className="kanban-empty">—</div>}
                </div>
              </DroppableColumn>
            )
          })}
        </div>
        <DragOverlay>{activeTask ? <Card task={activeTask} dragging /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}

function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={`kanban-col ${isOver ? 'drop-target' : ''}`}>
      {children}
    </div>
  )
}

function DraggableCard({
  task,
  onEdit,
  onToggleComplete,
}: {
  task: Task
  onEdit: (t: Task) => void
  onToggleComplete: (t: Task, checked: boolean) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.task_id })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      onClick={() => {
        if (!isDragging) onEdit(task)
      }}
    >
      <Card task={task} onToggleComplete={onToggleComplete} />
    </div>
  )
}

function Card({
  task,
  dragging,
  onToggleComplete,
}: {
  task: Task
  dragging?: boolean
  onToggleComplete?: (t: Task, checked: boolean) => void
}) {
  const done = task.status === 'Completed'
  return (
    <div className={`card ${dragging ? 'dragging' : ''} ${done ? 'card-done' : ''}`}>
      <div className="card-top">
        {onToggleComplete && (
          <CardCheckbox
            checked={done}
            onChange={(v) => onToggleComplete(task, v)}
          />
        )}
        <div className="card-name">{task.name || <em className="muted">(unnamed)</em>}</div>
      </div>
      <div className="card-meta">
        {task.status && (
          <span className={`pill pill-status pill-status-${slug(task.status)}`}>
            {task.status}
          </span>
        )}
        {task.priority && (
          <span className={`pill pill-priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        )}
        {task.issue_type && <span className="pill pill-type">{task.issue_type}</span>}
        {task.app_section && <span className="pill pill-section">{task.app_section}</span>}
        {task.owner && task.owner !== 'Unassigned' && (
          <span className="pill pill-owner">{task.owner}</span>
        )}
      </div>
    </div>
  )
}

function CardCheckbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label
      className="card-checkbox"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      title={checked ? 'Mark incomplete' : 'Mark complete'}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="card-checkbox-box" />
    </label>
  )
}

function GroupDot({ groupBy, value }: { groupBy: TaskKey; value: string }) {
  if (!value) return <span className="status-dot" />
  if (groupBy === 'status') {
    return <span className={`status-dot status-${slug(value)}`} />
  }
  if (groupBy === 'priority') {
    return <span className={`status-dot priority-${value.toLowerCase()}`} />
  }
  return <span className="status-dot status-generic" />
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
