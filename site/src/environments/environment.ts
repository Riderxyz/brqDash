// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  NomeDashBoard: 'DashBoard_Desenvolvimento',
  TIPOS_DEMANDAS: {
    DIMENSIONADA: 'Dimensionada',
    NORMAL: 'Normal',
    ENTREGA: 'Entrega'
  },
  firebase: {
    apiKey: "AIzaSyAnKExbIOibl8lFmIR4cSEc9HYEvDyKCrU",
    authDomain: "brq-sla.firebaseapp.com",
    databaseURL: "https://brq-sla.firebaseio.com",
    projectId: "brq-sla",
    storageBucket: "brq-sla.appspot.com",
    messagingSenderId: "227345514410",
    appId: "1:227345514410:web:8f9128b4675ea70b"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
