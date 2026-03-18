/**
 * Unified SSR server entrypoint used both locally (`node dist/ditectrev-server/main.js`)
 * and in Firebase Functions (`functions/index.js` generated from this bundle).
 */
import 'dotenv/config';
import 'zone.js/node';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import { renderModule } from '@angular/platform-server';
import { createWindow } from 'domino';
import { join } from 'path';
import { readFileSync } from 'fs';
import { AppServerModule } from './app/app.server.module';

export { AppServerModule } from './app/app.server.module';

const app = express();
const distFolder = join(process.cwd(), 'dist/ditectrev-browser');
const indexHtml = readFileSync(join(distFolder, 'index2.html'), 'utf-8');

// Some third-party libraries still touch browser globals during SSR.
const windowRef = createWindow(indexHtml);
(globalThis as any).window = windowRef;
(globalThis as any).document = windowRef.document;
(globalThis as any).navigator = windowRef.navigator;

if (!admin.apps.length) {
  admin.initializeApp();
}

app.use(express.static(distFolder));

app.get('*', (req, res) => {
  renderModule(AppServerModule, { document: indexHtml, url: req.url })
    .then((html) => res.send(html))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server error');
    });
});

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

    await mailTransport.sendMail({
      attachments: [
        {
          contentType: `${contactFormData.contentType ?? ''}`,
          filename: `${contactFormData.fileName ?? ''}`,
          path: `${contactFormData.fileUploader ?? ''}`,
        },
      ],
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

export const angularUniversalFunction = functions.https.onRequest(app);

export const contactFormFunction = functions.firestore
  .document(`${String(process.env['FIRESTORE_COLLECTION_MESSAGES'] ?? '')}/{formControlEmail}`)
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
