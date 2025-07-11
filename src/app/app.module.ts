// TODO: Check all config files like with tsconfig's. Also others options excluding security for Angular/TypeScript compilers.
// TODO: Check TSLint options.
// TODO: Check compiler options.
// TODO: Check angular.json and all compiling options.
// TODO: Fix unit tests from pipeline/npm run test runs only first test, ng test is required. Looks like now "npx nx run-many --all --target=test --parallel" is the way to go. Same for "ng lint" and "npm run lint"
// TODO: Check VSCode options.
// TODO: Add Docker Bench Security.
// TODO: Make error handling to Sentry, just be sure source maps aren't deployed to the hosting, only to Sentry (https://medium.com/angular-in-depth/debug-angular-apps-in-production-without-revealing-source-maps-ab4a235edd85).
// TODO: Check many interesting things from Angular 8 Example App.
// TODO: Add push notifications (something simple, e.g. sign up for a newsletter) and check offline worker after adding CSP.
// TODO: Check Google Analytics and Hotjar if works after implementing CSP.
// TODO: Remove 404 error related with manifest.
// TODO: Add JSDoc like in services.component.ts.
// TODO: Check if HTML markups such as &copy;, &amp; etc are being used instead of (c), & etc.
// TODO: Change all fonts units to rem.
// TODO: Make CSS and HTML alphabetically (only these are missing).
// TODO: Convert all PNG files to SVG, alternatively some to AVIF.
// TODO: Use native lazy loading on images (loading="lazy").
// TODO: Maybe instead of manually copying .env file to functions try https://stackoverflow.com/questions/51883178/firebase-functions-environment-variables-can-not-read-property-of-undefined/
// TODO: Try https://github.com/kangax/html-minifier

import Agastya from 'agastya';
import { AppComponent } from './app.component';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { CoreModule } from './../../../../libs/core/src/index';
import { environment } from '../environments/environment';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { HomeModule } from './../../../../libs/home/src/index';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { SharedModule } from './../../../../libs/shared/src/index';

new Agastya(String(process.env.AGASTYA_API_KEY)); // Make sure the environmental variable is a string.
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HomeModule,
    RoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: 'googleTagManagerId',
      useValue: String(process.env.GOOGLE_TAG_MANAGER), // TODO: This doesn't work, and the GTM is directly in index2.html at the moment.
    },
  ],
})
export class AppModule {}
