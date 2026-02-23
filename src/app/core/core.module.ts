import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * CoreModule: app-wide singletons and browser essentials.
 * Import only once (in AppModule). Uses withServerTransition for SSR.
 */
@NgModule({
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ditectrevSSR' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
})
export class CoreModule {
  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true });
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import it in AppModule only.'
      );
    }
  }
}
