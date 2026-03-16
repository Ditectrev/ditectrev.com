import 'hammerjs';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Workaround for service worker, issue #13351. Other than "Add to home screen" on mobile device everything works perfectly.
document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, appConfig)
    .then(() => {
      if ('serviceWorker' in navigator && environment.production) {
        navigator.serviceWorker.register('./ngsw-worker.js');
      }
    })
    .catch((err) => console.error(err));
});
