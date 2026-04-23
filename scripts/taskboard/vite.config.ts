import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const TSV_PATH = resolve(__dirname, '../../tasks.tsv')

function tasksApi(): Plugin {
  return {
    name: 'tasks-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/tasks')) return next()
        try {
          if (req.method === 'GET') {
            const raw = await readFile(TSV_PATH, 'utf8')
            res.setHeader('content-type', 'text/plain; charset=utf-8')
            res.end(raw)
            return
          }
          if (req.method === 'POST' || req.method === 'PUT') {
            const chunks: Buffer[] = []
            for await (const c of req) chunks.push(c as Buffer)
            await writeFile(TSV_PATH, Buffer.concat(chunks))
            res.statusCode = 204
            res.end()
            return
          }
          res.statusCode = 405
          res.end('method not allowed')
          return
        } catch (err) {
          res.statusCode = 500
          res.end(String(err))
          return
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tasksApi()],
  server: {
    port: 3009,
    host: '127.0.0.1',
  },
})
