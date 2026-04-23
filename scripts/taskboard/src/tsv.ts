import { COLUMNS, type Task, type TaskKey } from './schema'

export function escapeTsv(v: string): string {
  return v
    .replace(/\\/g, '\\\\')
    .replace(/\t/g, '\\t')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '\\n')
}

export function unescapeTsv(v: string): string {
  let out = ''
  for (let i = 0; i < v.length; i++) {
    const c = v[i]
    if (c === '\\' && i + 1 < v.length) {
      const nxt = v[i + 1]
      if (nxt === 'n') {
        out += '\n'
        i++
        continue
      }
      if (nxt === 't') {
        out += '\t'
        i++
        continue
      }
      if (nxt === '\\') {
        out += '\\'
        i++
        continue
      }
    }
    out += c
  }
  return out
}

export function parseTsv(raw: string): Task[] {
  const lines = raw.split('\n')
  if (lines.length < 2) return []
  const header = lines[0].split('\t')
  const mismatch = COLUMNS.some((c, i) => header[i] !== c)
  if (mismatch) {
    throw new Error(`tasks.tsv header mismatch. Got ${JSON.stringify(header)} expected ${JSON.stringify(COLUMNS)}`)
  }
  const rows: Task[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    const parts = line.split('\t')
    while (parts.length < COLUMNS.length) parts.push('')
    const rec = {} as Task
    COLUMNS.forEach((col: TaskKey, idx: number) => {
      rec[col] = unescapeTsv(parts[idx] ?? '')
    })
    rows.push(rec)
  }
  return rows
}

export function serializeTsv(rows: Task[]): string {
  const lines = [COLUMNS.join('\t')]
  for (const r of rows) {
    lines.push(COLUMNS.map((c) => escapeTsv(r[c] || '')).join('\t'))
  }
  return lines.join('\n') + '\n'
}
