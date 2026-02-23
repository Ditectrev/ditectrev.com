// Browser config: this file is compiled into the Angular bundle. The app does NOT read .env
// (that is Node/server only). Use fileReplacements in angular.json for prod, or replace
// these placeholders at build/deploy time (e.g. from CI env vars).

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'FIREBASE_API_KEY_STAGING',
    authDomain: 'FIREBASE_AUTH_DOMAIN_STAGING',
    databaseURL: 'FIREBASE_DATABASE_URL_STAGING',
    projectId: 'FIREBASE_PROJECT_ID_STAGING',
    storageBucket: 'FIREBASE_STORAGE_BUCKET_STAGING',
    messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID_STAGING',
    appId: 'FIREBASE_APP_ID_STAGING',
    measurementId: 'FIREBASE_MEASUREMENT_ID_STAGING',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
