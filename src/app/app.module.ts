// TODO: Make error handling to Sentry, just be sure source maps aren't deployed to the hosting, only to Sentry (https://medium.com/angular-in-depth/debug-angular-apps-in-production-without-revealing-source-maps-ab4a235edd85).
// TODO: Add push notifications (something simple, e.g. sign up for a newsletter) and check offline worker after adding CSP.
// TODO: Check Google Analytics and Hotjar if works after implementing CSP.
// TODO: Remove 404 error related with manifest.
// TODO: Add JSDoc like in services.component.ts.
// TODO: Check if HTML markups such as &copy;, &amp; etc are being used instead of (c), & etc.
// TODO: Convert all PNG files to SVG, alternatively some to AVIF.
// TODO: Use native lazy loading on images (loading="lazy").
// TODO: Maybe instead of manually copying .env file to functions try https://stackoverflow.com/questions/51883178/firebase-functions-environment-variables-can-not-read-property-of-undefined/

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [],
  imports: [
    AppComponent,
    CoreModule,
    HomeModule,
    RoutingModule,
    // SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: 'googleTagManagerId',
      useValue: String(process.env['GOOGLE_TAG_MANAGER_ID']),
    },
  ],
})
export class AppModule {}
