// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBxeNceA85FhgbjpMFEL7EUAao-TXT3hc8",
    authDomain: "receipts-2a38a.firebaseapp.com",
    databaseURL: "https://receipts-2a38a.firebaseio.com",
    projectId: "receipts-2a38a",
    storageBucket: "receipts-2a38a.appspot.com",
    messagingSenderId: "1059654341885"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
