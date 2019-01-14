import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});


export const pushNotification = functions.database.ref('/brq-sla/ONS').onWrite(
  async (snapshot, context) => {
    const original = snapshot.before.val()
    const changed = snapshot.after.val()
    const resx = {
      antes: original,
      depois: changed
    }
    const colorHexFull = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    const payload = {
      notification: {
        body: "O que temos aqui, hum?",
        tap: "true",
        color: colorHexFull,
        title: "Funciona!",
      }
    }

    const cleanupTokens = (response, tokens) => {
      // For each notification we check if there was an error.
      const tokensToRemove = {};
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Não conseguiu enviar para:', tokens[index], error);
          console.log('o q vem dentro do codigo de erro?', error.code)
          // Cleanup the tokens who are not registered anymore.
          /*   if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove[`/fcmTokens/${tokens[index]}`] = null;
            } */
        }
      });
      return admin.database().ref().update(tokensToRemove);
    }
    // Get the list of device tokens.
    const allTokens = await admin.database().ref('deviceId').once('value');
    if (allTokens.exists()) {
      // Listing all device tokens to send a notification to.
      const tokens = Object.keys(allTokens.val());
      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(tokens, payload);
      await cleanupTokens(response, tokens);
      console.log('Notifications have been sent and tokens cleaned up.', response);
    }




  });



  // Listing all device tokens to send a notification to.
  /*  */

  // Send notifications to all tokens.
  /* const response = await admin.messaging().sendToDevice(tokens, payload); */

  /* console.log('Notifications have been sent and tokens cleaned up.'); */


})
