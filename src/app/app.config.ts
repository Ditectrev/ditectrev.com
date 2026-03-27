import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';
import { getRuntimeEnv } from './utils/runtime-env';

const firebaseConfig = {
  apiKey: getRuntimeEnv('FIREBASE_API_KEY'),
  authDomain: getRuntimeEnv('FIREBASE_AUTH_DOMAIN'),
  databaseURL: getRuntimeEnv('FIREBASE_DATABASE_URL'),
  projectId: getRuntimeEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getRuntimeEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getRuntimeEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getRuntimeEnv('FIREBASE_APP_ID'),
  measurementId: getRuntimeEnv('FIREBASE_MEASUREMENT_ID'),
};
const isFirebaseConfigured =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId;

const baseProviders = [
  provideRouter(routes),
  provideAnimations(),
  provideHttpClient(),
  {
    provide: 'googleTagManagerId',
    useValue: getRuntimeEnv('GOOGLE_TAG_MANAGER_ID'),
  },
];

export const appConfig: ApplicationConfig = {
  // Register Firebase only when browser config is present.
  providers: isFirebaseConfigured
    ? [...baseProviders, importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig))]
    : baseProviders,
};
