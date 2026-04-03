# Firebase Functions Wrapper

This folder is a minimal Firebase Functions wrapper used during deploys.

CI generates `functions/index.js` from the SSR server bundle and Firebase deploys this folder as the Functions source.

## Mail trigger (`contactFormFunction`)

`src/server.ts` loads **`functions/.env`** (next to `index.js`) first, then the repo root `.env`, via `dotenv`. GitHub Actions runs **`scripts/write-functions-env.mjs`** before `firebase deploy`, which writes `functions/.env` from the workflow’s **`MAIL_*`** and **`FIRESTORE_COLLECTION_MESSAGES`** secrets so the deployed bundle sees the same values at runtime.

**Manual override (optional):** You can still set variables on the function in [Cloud Functions](https://console.cloud.google.com/functions) → **Runtime environment variables**, or use [Secret Manager](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets).

`functions/.env` is gitignored; do not commit it.
