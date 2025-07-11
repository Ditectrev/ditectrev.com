// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    // These will be replaced at build time by webpack
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
