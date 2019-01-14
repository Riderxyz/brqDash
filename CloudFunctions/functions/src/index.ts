import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const pushNotification = functions.database.ref('/brq-sla/ONS').onWrite(
  async (snapshot, context) => {
    try {
      const limites = {
        warning: 600,
        danger: 360,
        crazy: 120
      }
      const dataValue = snapshot.after.val();
      const colorHexFull = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      console.log('FUNCIONA!!!!', colorHexFull);
      const allTokens = await admin.database().ref('/DeviceId').once('value');
      const tokens = Object.keys(allTokens.val());
      const dataFromPush = {
        tokenList: allTokens.val(),
        tokensToDeploy: tokens,
        dados: snapshot.after.val()
      }
      console.log('Eu preciso disso =>!!!!', dataFromPush);
      const GerarBody = () => {
        let exteiras = ''
        snapshot.after.val()
        dataValue.forEach(element => {
          exteiras += element.esteira + ' - ' + element.tfs + '    '

        });
        return exteiras
      }
      const payload = {
        notification: {
          body: GerarBody(),
          tap: "true",
          color: colorHexFull,
          title: "Funciona!",
        }
      }
      const response = await admin.messaging().sendToDevice(tokens, payload);
      console.log('O body gerado para o Payload', GerarBody());

      console.log('Notifications have been sent', response)
      /*     const pushType = () => {
            let retorno = '';
            const minutos = hourToMinute("009:22");
            if ((minutos >= limites.danger) && (minutos <= limites.warning)) {
              retorno = 'warning';
            } else {
              if ((minutos >= limites.crazy) && (minutos <= limites.danger)) {
                retorno = 'danger';
              } else {
                if (minutos <= limites.crazy) {
                  retorno = 'crazy';
                } else {
                  retorno = 'normal';
                }
              }
            }
            return retorno;
          }
     */
      const hourToMinute = (hh: string): number => {
        const arrayHora = hh.split(':');
        return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
      }
      /*      //const promises = []
           
           const payload = {
             notification: {
               body: "O que temos aqui, hum?",
               tap: "true",
               color: colorHexFull,
               title: "Funciona!",
             }
           }
     
           const LimparTokenList = (response, tokens) => {
             // For each notification we check if there was an error.
             const tokensToRemove = {};
             response.results.forEach((result, index) => {
               const error = result.error;
               if (error) {
                 console.error('Não conseguiu enviar para:', tokens[index], error);
                 console.log('o q vem dentro do codigo de erro?', error.code)
                 // Cleanup the tokens who are not registered anymore.
                 if (error.code === 'messaging/invalid-registration-token' ||
                   error.code === 'messaging/registration-token-not-registered') {
                   tokensToRemove[`/deviceId/${tokens[index]}`] = null;
                 }
               }
             });
             return admin.database().ref().update(tokensToRemove);
           }
           const allTokens = await admin.database().ref('deviceId').once('value');
           if (allTokens.exists()) {
             // Listing all device tokens to send a notification to.
             const tokens = Object.keys(allTokens.val());
             const dataFromPush = {
               tokenFunction: allTokens,
               tokenList: allTokens.val(),
               tokensToDeploy: tokens
             }
             console.log('O q eu preciso saber', dataFromPush);
             // Get the list of device tokens.
             // Send notifications to all tokens.
             // const response = await admin.messaging().sendToDevice(tokens, payload);
             // await LimparTokenList(response, tokens);
             // console.log('Notifications have been sent and tokens cleaned up.', response)
           } */
    }
    catch (error) {
      console.log('O que deu errado aqui?', error);

    }
  })
