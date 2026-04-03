/**
 * Unified SSR server entrypoint used both locally (`node dist/ditectrev-server/main.js`)
 * and in Firebase Functions (`functions/index.js` generated from this bundle).
 */
import { config as loadEnv } from 'dotenv';
import 'zone.js/node';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from 'firebase-functions/v1';
import * as nodemailer from 'nodemailer';
import { renderModule } from '@angular/platform-server';
import * as domino from 'domino';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import helmet from 'helmet';
import { AppServerModule } from './app/app.server.module';

// CI writes `functions/.env` from GitHub secrets before `firebase deploy` (see `scripts/write-functions-env.mjs`).
// Local dev: repo root `.env` (second line). Packaged `.env` is loaded first on Cloud Functions.
loadEnv({ path: join(__dirname, '.env') });
loadEnv({ path: join(process.cwd(), '.env') });

export { AppServerModule } from './app/app.server.module';

const app = express();
// Hosting runtimes sometimes have different `process.cwd()` values.
// Prefer locating the browser dist next to this compiled server bundle.
const distFolderFromCwd = join(process.cwd(), 'dist/ditectrev-browser');
const distFolderFromDirname = join(__dirname, 'dist/ditectrev-browser');
const distFolderFromDirnameAlt = join(__dirname, '..', 'ditectrev-browser');
const distFolder = existsSync(distFolderFromDirname)
  ? distFolderFromDirname
  : existsSync(distFolderFromDirnameAlt)
    ? distFolderFromDirnameAlt
    : distFolderFromCwd;

const indexHtmlPath = join(distFolder, 'index.html');
const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

function ensureSsrDomGlobals(): void {
  if ((globalThis as any).window?.document) {
    return;
  }

  // Some third-party libraries still touch browser globals during SSR.
  let windowRef;
  try {
    windowRef = (domino as any).createWindow(indexHtml);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : err ? String(err) : 'Unknown error';
    throw new Error(`domino.createWindow failed: ${errMsg} (indexHtmlPath=${indexHtmlPath})`);
  }

  (globalThis as any).window = windowRef;
  (globalThis as any).document = windowRef.document;
  (globalThis as any).navigator = windowRef.navigator;
  (globalThis as any).HTMLElement = (windowRef as any).HTMLElement;
  (globalThis as any).HTMLTemplateElement = (windowRef as any).HTMLTemplateElement;
  (globalThis as any).Node = (windowRef as any).Node;
}

if (!admin.apps.length) {
  admin.initializeApp();
}

// Security headers. Default Helmet CSP blocks reCAPTCHA (google.com / gstatic), GTM, and
// inline bootstraps; extend explicitly for those integrations and Firebase client calls.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        frameSrc: [
          "'self'",
          'https://www.google.com',
          'https://recaptcha.google.com',
        ],
        imgSrc: ["'self'", 'data:', 'https:'],
        objectSrc: ["'none'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://www.google.com',
          'https://www.gstatic.com',
          'https://www.googletagmanager.com',
          // Mailchimp JSONP (`footer.component` subscribe) loads a script from *.list-manage.com
          'https://*.list-manage.com',
        ],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        connectSrc: [
          "'self'",
          'https://www.google.com',
          'https://www.gstatic.com',
          'https://*.googleapis.com',
          'https://*.googletagmanager.com',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://stats.g.doubleclick.net',
          'https://*.list-manage.com',
          'wss://*.googleapis.com',
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);

app.use(express.static(distFolder));

// Cheap liveness probe for load balancers / CI HTTP smoke (must be before SPA fallback).
app.get('/health', (_req, res) => {
  res.status(200).type('text/plain').send('ok');
});

app.get('*', (req, res) => {
  (async () => {
    try {
      ensureSsrDomGlobals();
      const html = await renderModule(AppServerModule, {
        document: indexHtml,
        url: req.url,
      });
      res.send(html);
    } catch (err: unknown) {
      const errObj = err as any;
      const errMessage =
        errObj && typeof errObj === 'object' && 'message' in errObj
          ? String(errObj.message)
          : err
            ? String(err)
            : 'Unknown error';
      const errStack =
        errObj && typeof errObj === 'object' && 'stack' in errObj
          ? String(errObj.stack ?? '')
          : '';

      console.error('SSR render failed', { url: req.url, err });

      const debug = process.env['SSR_DEBUG'] === 'true';
      const body = debug
        ? `<html><body><pre>${escapeHtml(errMessage)}${errStack ? `\n\n${escapeHtml(errStack.slice(0, 20000))}` : ''}</pre></body></html>`
        : '<html><body>Internal Server Error</body></html>';

      res.status(500).type('text/html').set('Cache-Control', 'no-store').send(body);
    }
  })();
});

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildContactAttachments(
  contactFormData: Record<string, unknown>
): import('nodemailer/lib/mailer').Attachment[] | undefined {
  const raw = contactFormData['fileUploader'];
  if (raw == null || raw === '') {
    return undefined;
  }
  const urls = Array.isArray(raw) ? raw : [raw];
  const types = contactFormData['contentType'];
  const names = contactFormData['fileName'];
  const typeList = Array.isArray(types) ? types : [types];
  const nameList = Array.isArray(names) ? names : [names];

  const attachments: import('nodemailer/lib/mailer').Attachment[] = [];
  for (let i = 0; i < urls.length; i++) {
    const path = String(urls[i] ?? '').trim();
    if (!path) {
      continue;
    }
    attachments.push({
      contentType: String(typeList[i] ?? typeList[0] ?? 'application/octet-stream'),
      filename: String(nameList[i] ?? nameList[0] ?? `attachment-${i + 1}`),
      path,
    });
  }
  return attachments.length > 0 ? attachments : undefined;
}

/** Safe for logs: which mail env vars are set (never log passwords). */
function mailEnvSummary(): {
  mailHost: string;
  mailPort: number;
  hasMailAccount: boolean;
  hasMailPassword: boolean;
} {
  return {
    mailHost: String(process.env['MAIL_HOST'] ?? '').trim(),
    mailPort: Number(process.env['MAIL_PORT'] ?? 0) || 0,
    hasMailAccount: String(process.env['MAIL_ACCOUNT'] ?? '').trim().length > 0,
    hasMailPassword: String(process.env['MAIL_PASSWORD'] ?? '').length > 0,
  };
}

async function onCreateSendEmail(snap: FirebaseFirestore.DocumentSnapshot, _context: any): Promise<void> {
  const docId = snap.id;
  const env = mailEnvSummary();

  functions.logger.info('contactFormFunction: Firestore onCreate', {
    docId,
    collection: firestoreMessagesCollection,
    mailEnv: env,
  });

  try {
    const contactFormData = snap.data();
    if (!contactFormData) {
      functions.logger.warn('contactFormFunction: no document data; skipping email', { docId });
      return;
    }

    if (!env.mailHost) {
      functions.logger.error(
        'contactFormFunction: MAIL_HOST is not set. Set secrets/config in Firebase and redeploy.',
        { docId }
      );
      return;
    }
    if (!env.hasMailAccount || !env.hasMailPassword) {
      functions.logger.error(
        'contactFormFunction: MAIL_ACCOUNT or MAIL_PASSWORD is missing. Set Firebase Functions secrets / env.',
        { docId, hasMailAccount: env.hasMailAccount, hasMailPassword: env.hasMailPassword }
      );
      return;
    }

    const mailTransport = nodemailer.createTransport({
      auth: {
        pass: String(process.env['MAIL_PASSWORD'] ?? ''),
        user: String(process.env['MAIL_ACCOUNT'] ?? ''),
      },
      host: env.mailHost,
      port: env.mailPort || 587,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const attachments = buildContactAttachments(contactFormData as Record<string, unknown>);
    if (attachments?.length) {
      functions.logger.info('contactFormFunction: including attachments', {
        docId,
        count: attachments.length,
      });
    }

    const toAddr = String(contactFormData['formControlEmail'] ?? '');
    functions.logger.info('contactFormFunction: sending mail', {
      docId,
      toDomain: toAddr.includes('@') ? toAddr.split('@')[1] : '(invalid)',
      hasAttachments: !!attachments?.length,
    });

    const deadline = contactFormData['formControlDeadline'] as { _seconds?: number } | undefined;
    const info = await mailTransport.sendMail({
      ...(attachments ? { attachments } : {}),
      bcc: 'contact@ditectrev.com',
      from: `${contactFormData['formControlName']} <${contactFormData['formControlEmail']}>`,
      html: `
        <p>A message from a contact form has been sent. That is a copy of your message.</p>
        <h3>Message content:</h3>
        <ul>
          <li>Name: ${contactFormData['formControlName']}</li>
          <li>Email: ${contactFormData['formControlEmail']}</li>
          <li>Phone: ${contactFormData['formControlPhone']}</li>
          <li>Project deadline: ${deadline?._seconds ? new Date(deadline._seconds * 1000) : ''}</li>
          <li>Project description: ${contactFormData['formControlDescription']}</li>
          <li>Preferred form of contact: ${contactFormData['formControlContactPreference']}</li>
          <li>Interested in the following services: ${contactFormData['formControlService']}</li>
        </ul>
      `,
      subject: 'Contact Form: Ditectrev',
      to: `${contactFormData['formControlEmail']}`,
    });

    functions.logger.info('contactFormFunction: mail sent OK', {
      docId,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: typeof info.response === 'string' ? info.response.slice(0, 500) : undefined,
    });
  } catch (err: unknown) {
    const e = err as {
      message?: string;
      code?: string;
      command?: string;
      response?: string;
      responseCode?: number;
      stack?: string;
    };
    functions.logger.error('contactFormFunction: sendMail failed', {
      docId,
      errorMessage: e?.message ?? String(err),
      code: e?.code,
      command: e?.command,
      response: e?.response,
      responseCode: e?.responseCode,
      stackPreview: e?.stack?.split('\n').slice(0, 8).join('\n'),
    });
  }
}

/**
 * Must be the same collection the Angular client writes to (`getRuntimeEnv('FIRESTORE_COLLECTION_MESSAGES')`
 * from `src/assets/env.js`, generated by `generate-browser-env.mjs` from `.env`).
 * If unset in the Functions runtime, Cloud Functions previously defaulted to `testing`, which caused 0 invocations
 * when the app wrote elsewhere. Set `FIRESTORE_COLLECTION_MESSAGES` in Firebase (or `.env` for emulators) if you use a different name.
 */
const firestoreMessagesCollection =
  String(process.env['FIRESTORE_COLLECTION_MESSAGES'] ?? '').trim() ||
  'messages_new_after_migration';

functions.logger.info('contactFormFunction: configured Firestore trigger', {
  documentPath: `${firestoreMessagesCollection}/{messageId}`,
  envOverride: !!String(process.env['FIRESTORE_COLLECTION_MESSAGES'] ?? '').trim(),
});

export const angularUniversalFunction = functions
  .region('europe-west3')
  .https.onRequest(app);

/**
 * Region must match your **Firestore database** location (not necessarily the same as the HTTPS SSR function).
 * Default US Firestore (nam5) → `us-central1` triggers. EU DB (eur3) → use an EU region from Firebase’s table.
 * Keeping SSR in `europe-west3` and this trigger in `us-central1` is valid when the DB is US and you want EU edge for HTTP only.
 */
export const contactFormFunction = functions
  .region('us-central1')
  .firestore
  .document(`${firestoreMessagesCollection}/{messageId}`)
  .onCreate(onCreateSendEmail);

if (require.main === module) {
  const defaultPort = Number(process.env['PORT']) || 4000;
  const portsToTry = [defaultPort, 4001, 4002, 4003].filter(
    (port, index, ports) => ports.indexOf(port) === index
  );

  const tryListen = (index: number): void => {
    if (index >= portsToTry.length) {
      throw new Error('All ports in use: ' + portsToTry.join(', '));
    }

    const port = portsToTry[index];
    const server = app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err?.code === 'EADDRINUSE') {
        tryListen(index + 1);
      } else {
        throw err;
      }
    });
  };

  tryListen(0);
}
