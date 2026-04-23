import type { Task } from './schema'
import { parseTsv, serializeTsv } from './tsv'

export async function loadTasks(): Promise<Task[]> {
  const r = await fetch('/api/tasks', { cache: 'no-store' })
  if (!r.ok) throw new Error(`load failed: ${r.status}`)
  const raw = await r.text()
  return parseTsv(raw)
}

export async function saveTasks(rows: Task[]): Promise<void> {
  const body = serializeTsv(rows)
  const r = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'content-type': 'text/plain; charset=utf-8' },
    body,
  })
  if (!r.ok) throw new Error(`save failed: ${r.status}`)
}
