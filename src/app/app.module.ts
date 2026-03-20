// TODO: Make error handling to Sentry, just be sure source maps aren't deployed to the hosting, only to Sentry (https://medium.com/angular-in-depth/debug-angular-apps-in-production-without-revealing-source-maps-ab4a235edd85).
// TODO: Add push notifications (something simple, e.g. sign up for a newsletter) and check offline worker after adding CSP.
// TODO: Check Google Analytics and Hotjar if works after implementing CSP.
// TODO: Convert all PNG files to SVG, alternatively some to AVIF.
// TODO: Use native lazy loading on images (loading="lazy").

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
