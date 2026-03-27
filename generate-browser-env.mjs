import 'dotenv/config';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Only include values that are safe to expose in browser bundles.
const browserKeys = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_MEASUREMENT_ID',
  'FIRESTORE_COLLECTION_FILES',
  'FIRESTORE_COLLECTION_MESSAGES',
  'GOOGLE_TAG_MANAGER_ID',
  'MAILCHIMP_SUBSCRIBE_ENDPOINT',
  'MAILCHIMP_B_FIELD',
  'RECAPTCHA_API_KEY',
];

// Never expose these server-only values to the browser runtime.
const serverOnlyKeys = [
  'FIREBASE_DEPLOY_KEY',
  'MAIL_ACCOUNT',
  'MAIL_PASSWORD',
  'MAIL_HOST',
  'MAIL_PORT',
];

const overlaps = browserKeys.filter((key) => serverOnlyKeys.includes(key));
if (overlaps.length > 0) {
  throw new Error(`Unsafe browser env key(s): ${overlaps.join(', ')}`);
}

const env = Object.fromEntries(
  browserKeys.map((key) => [key, String(process.env[key] ?? '')])
);

const outDir = join(process.cwd(), 'src', 'assets');
const outPath = join(outDir, 'env.js');
mkdirSync(outDir, { recursive: true });
writeFileSync(
  outPath,
  `window.__env = Object.freeze(${JSON.stringify(env, null, 2)});\n`,
  'utf8'
);

console.log(`Generated browser env: ${outPath}`);
