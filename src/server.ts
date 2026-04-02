/**
 * Unified SSR server entrypoint used both locally (`node dist/ditectrev-server/main.js`)
 * and in Firebase Functions (`functions/index.js` generated from this bundle).
 */
import 'dotenv/config';
import 'zone.js/node';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from 'firebase-functions/v1';
import * as nodemailer from 'nodemailer';
import { renderModule } from '@angular/platform-server';
import { createWindow } from 'domino';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import helmet from 'helmet';
import { AppServerModule } from './app/app.server.module';

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
    windowRef = createWindow(indexHtml);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : err ? String(err) : 'Unknown error';
    const errStack = err instanceof Error ? err.stack ?? '' : '';
    // Throw a new error that contains where we loaded index.html from.
    throw new Error(
      `domino.createWindow failed: ${errMsg} (indexHtmlPath=${indexHtmlPath}, indexHtmlLen=${indexHtml.length})\n${errStack}`
    );
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

// Add common security headers for SSR responses.
app.use(helmet());

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

      const errDebug = (() => {
        try {
          if (errObj && typeof errObj === 'object') {
            const ctorName = errObj?.constructor?.name ?? 'unknown';
            const keys = Object.keys(errObj).slice(0, 20).join(', ');
            return `type=object ctor=${ctorName} keys=[${keys}]`;
          }
          return `type=${typeof err} value=${String(err)}`;
        } catch {
          return `type=${typeof err}`;
        }
      })();

      console.error('SSR render failed for', req.url);
      console.error('SSR errMessage:', errMessage);
      if (errStack) console.error('SSR errStack:\n', errStack);
      console.error('SSR err raw:', err);

      // Keep response short by default; enable full stack by setting SSR_DEBUG=true.
      const stackToShow = errStack ? errStack.slice(0, 20000) : '';
      res
        .status(500)
        .type('text/html')
        .set('Cache-Control', 'no-store')
        .send(
          `<html><body><pre>Server error: ${escapeHtml(
            errMessage
          )}\n${escapeHtml(errDebug)}${stackToShow ? `\n\n${escapeHtml(stackToShow)}` : ''}</pre></body></html>`
        );
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

async function onCreateSendEmail(snap: any, _context: any): Promise<void> {
  try {
    const contactFormData = snap.data();
    if (!contactFormData) {
      return;
    }

    const mailTransport = nodemailer.createTransport({
      auth: {
        pass: String(process.env['MAIL_PASSWORD'] ?? ''),
        user: String(process.env['MAIL_ACCOUNT'] ?? ''),
      },
      host: String(process.env['MAIL_HOST'] ?? ''),
      port: Number(process.env['MAIL_PORT'] ?? 0),
      tls: {
        rejectUnauthorized: false,
      },
    });

    const attachments = buildContactAttachments(contactFormData as Record<string, unknown>);

    await mailTransport.sendMail({
      ...(attachments ? { attachments } : {}),
      bcc: 'contact@ditectrev.com',
      from: `${contactFormData.formControlName} <${contactFormData.formControlEmail}>`,
      html: `
        <p>A message from a contact form has been sent. That is a copy of your message.</p>
        <h3>Message content:</h3>
        <ul>
          <li>Name: ${contactFormData.formControlName}</li>
          <li>Email: ${contactFormData.formControlEmail}</li>
          <li>Phone: ${contactFormData.formControlPhone}</li>
          <li>Project deadline: ${contactFormData.formControlDeadline?._seconds ? new Date(contactFormData.formControlDeadline._seconds * 1000) : ''}</li>
          <li>Project description: ${contactFormData.formControlDescription}</li>
          <li>Preferred form of contact: ${contactFormData.formControlContactPreference}</li>
          <li>Interested in the following services: ${contactFormData.formControlService}</li>
        </ul>
      `,
      subject: 'Contact Form: Ditectrev',
      to: `${contactFormData.formControlEmail}`,
    });
  } catch (err) {
    console.error(err);
  }
}

const firestoreMessagesCollection =
  String(process.env['FIRESTORE_COLLECTION_MESSAGES'] ?? '').trim() || 'testing';

export const angularUniversalFunction = functions
  .region('europe-west3')
  .https.onRequest(app);

/** Any document ID — client uses `.add()` (auto IDs), not email as document ID. */
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
