// Shared helpers for the scene:* CLI scripts.
//
// Auth model: prefer SUPABASE_SERVICE_ROLE_KEY (bypasses RLS, lets the script
// act on any user's projects). Otherwise sign in as a real user with
// SCENE_USER_EMAIL + SCENE_USER_PASSWORD via the anon key.
//
// All vars come from App/.env.local (same file the Vite dev server reads).

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(__dirname, '..', '..');
const SCENES_DIR = resolve(APP_ROOT, 'scenes');

function loadDotenv(path: string): void {
  if (!existsSync(path)) return;
  const text = readFileSync(path, 'utf8');
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotenv(resolve(APP_ROOT, '.env.local'));
loadDotenv(resolve(APP_ROOT, '.env'));

export function getScenesDir(): string {
  if (!existsSync(SCENES_DIR)) mkdirSync(SCENES_DIR, { recursive: true });
  return SCENES_DIR;
}

export function sceneFilePath(projectId: string): string {
  return resolve(getScenesDir(), `${projectId}.json`);
}

export interface AuthedClient {
  supabase: SupabaseClient;
  userId: string;
  mode: 'service_role' | 'user_session';
}

export async function getAuthedClient(): Promise<AuthedClient> {
  const url = process.env.VITE_SUPABASE_URL;
  if (!url) {
    throw new Error('Missing VITE_SUPABASE_URL in App/.env.local');
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.VITE_SUPABASE_KEY;

  if (serviceRoleKey) {
    const userId = process.env.SCENE_USER_ID;
    if (!userId) {
      throw new Error(
        'SUPABASE_SERVICE_ROLE_KEY is set but SCENE_USER_ID is not. ' +
        'Service-role mode bypasses RLS, so the script needs to know which user_id to write rows for.'
      );
    }
    const supabase = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    return { supabase, userId, mode: 'service_role' };
  }

  if (!anonKey) {
    throw new Error('Missing VITE_SUPABASE_KEY in App/.env.local');
  }
  const email = process.env.SCENE_USER_EMAIL;
  const password = process.env.SCENE_USER_PASSWORD;
  if (!email || !password) {
    throw new Error(
      'Missing SCENE_USER_EMAIL / SCENE_USER_PASSWORD in App/.env.local. ' +
      'Add them so the script can sign in, or set SUPABASE_SERVICE_ROLE_KEY + SCENE_USER_ID instead.'
    );
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    throw new Error(`Sign-in failed: ${error?.message ?? 'no user returned'}`);
  }
  return { supabase, userId: data.user.id, mode: 'user_session' };
}

export function newProjectId(): string {
  // Prefer crypto.randomUUID if available (Node 19+); fallback to a random hex.
  const uuid = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `v2_${uuid}`;
}

export function shortId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

export function fail(msg: string): never {
  console.error(`error: ${msg}`);
  process.exit(1);
}

export function getArg(idx: number, name: string): string {
  const v = process.argv[2 + idx];
  if (!v) fail(`missing argument: ${name}`);
  return v;
}
