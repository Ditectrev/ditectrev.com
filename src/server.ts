/**
 * Runnable SSR server entry for `ng run ditectrev:serve-ssr`.
 * When built, running `node dist/ditectrev-server/main.js` starts this Express server.
 */
import 'zone.js/node';
import * as express from 'express';
import { renderModule } from '@angular/platform-server';
import { join } from 'path';
import { readFileSync } from 'fs';
import { AppServerModule } from './app/app.server.module';

export { AppServerModule } from './app/app.server.module';

const app = express();
const distFolder = join(process.cwd(), 'dist/ditectrev-browser');
const indexHtml = readFileSync(join(distFolder, 'index2.html'), 'utf-8');

app.use(express.static(distFolder));

app.get('*', (req, res) => {
  renderModule(AppServerModule, { document: indexHtml, url: req.url })
    .then((html) => res.send(html))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server error');
    });
});

const defaultPort = Number(process.env['PORT']) || 4000;
const portsToTry = [defaultPort, 4001, 4002, 4003].filter((p, i, a) => a.indexOf(p) === i);

function tryListen(index: number) {
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
}
tryListen(0);
