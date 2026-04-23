export const COLUMNS = [
  'task_id',
  'name',
  'status',
  'priority',
  'issue_type',
  'app_section',
  'owner',
  'parent',
  'notes',
  'created_at',
  'completed_at',
] as const
export type TaskKey = (typeof COLUMNS)[number]
export type Task = Record<TaskKey, string>

export const STATUS_OPTIONS = [
  'New',
  'Backlog',
  'Do Next',
  'In Progress',
  'Research & Plan',
  'Need Testing',
  'Completed',
  'Cancelled',
  'Future Upgrades',
] as const
export const PRIORITY_OPTIONS = ['Critical', 'High', 'Medium', 'Low'] as const
export const ISSUE_TYPE_OPTIONS = ['Bug', 'UX/UI', 'Technical Debt', 'Feature Request', 'Ideas'] as const
export const APP_SECTION_OPTIONS = [
  'General',
  'Animation Variables',
  'Timeline',
  'Canvas',
  'File System',
  'Front Page',
  'Exporters',
] as const
export const OWNER_OPTIONS = ['Unassigned', 'Alexa', 'Gustavo & Team'] as const

export const DROPDOWNS: Record<string, readonly string[]> = {
  status: STATUS_OPTIONS,
  priority: PRIORITY_OPTIONS,
  issue_type: ISSUE_TYPE_OPTIONS,
  app_section: APP_SECTION_OPTIONS,
  owner: OWNER_OPTIONS,
}

export const GROUPABLE_KEYS: TaskKey[] = [
  'status',
  'priority',
  'issue_type',
  'app_section',
  'owner',
]

export const LABELS: Record<TaskKey, string> = {
  task_id: 'Task ID',
  name: 'Name',
  status: 'Status',
  priority: 'Priority',
  issue_type: 'Issue Type',
  app_section: 'App Section',
  owner: 'Owner',
  parent: 'Parent Task',
  notes: 'Notes',
  created_at: 'Created At',
  completed_at: 'Completed At',
}

export function emptyTask(): Task {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
  return {
    task_id: `local-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    name: '',
    status: 'New',
    priority: '',
    issue_type: '',
    app_section: '',
    owner: 'Unassigned',
    parent: '',
    notes: '',
    created_at: now,
    completed_at: '',
  }
}
