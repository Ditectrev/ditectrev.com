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

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
