import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: String(process.env['FIREBASE_API_KEY'] ?? ''),
  authDomain: String(process.env['FIREBASE_AUTH_DOMAIN'] ?? ''),
  databaseURL: String(process.env['FIREBASE_DATABASE_URL'] ?? ''),
  projectId: String(process.env['FIREBASE_PROJECT_ID'] ?? ''),
  storageBucket: String(process.env['FIREBASE_STORAGE_BUCKET'] ?? ''),
  messagingSenderId: String(process.env['FIREBASE_MESSAGING_SENDER_ID'] ?? ''),
  appId: String(process.env['FIREBASE_APP_ID'] ?? ''),
  measurementId: String(process.env['FIREBASE_MEASUREMENT_ID'] ?? ''),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    {
      provide: 'googleTagManagerId',
      useValue: String(process.env['GOOGLE_TAG_MANAGER_ID']),
    },
  ]
};
