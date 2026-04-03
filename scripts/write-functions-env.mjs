#!/usr/bin/env node
/**
 * Writes `functions/.env` from the current process environment so `firebase deploy` uploads it
 * next to `index.js`. `src/server.ts` loads it via `loadEnv({ path: join(__dirname, '.env') })`.
 *
 * Intended for GitHub Actions (`GITHUB_ACTIONS=true`). Local deploy: set `WRITE_FUNCTIONS_ENV=1`
 * or rely on Cloud Console env / root `.env` for local runs.
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const outPath = join(rootDir, 'functions', '.env');

/** Keys the SSR bundle reads at runtime on Cloud Functions (keep in sync with deploy workflow env). */
const KEYS = [
  'MAIL_HOST',
  'MAIL_PORT',
  'MAIL_ACCOUNT',
  'MAIL_PASSWORD',
  'FIRESTORE_COLLECTION_MESSAGES',
];

function shouldRun() {
  return process.env.GITHUB_ACTIONS === 'true' || process.env.WRITE_FUNCTIONS_ENV === '1';
}

function escapeValue(v) {
  return String(v)
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/"/g, '\\"');
}

function main() {
  if (!shouldRun()) {
    console.log('write-functions-env: skip (not CI; export WRITE_FUNCTIONS_ENV=1 to force)');
    return;
  }

  const lines = [];
  for (const k of KEYS) {
    const v = process.env[k];
    if (v === undefined || v === '') continue;
    lines.push(`${k}="${escapeValue(v)}"`);
  }

  if (lines.length === 0) {
    console.warn('write-functions-env: no matching env keys set; not writing functions/.env');
    return;
  }

  writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');
  console.log(`write-functions-env: wrote ${lines.length} entries to functions/.env`);
}

main();
