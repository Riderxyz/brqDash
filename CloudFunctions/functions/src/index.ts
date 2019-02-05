import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const pushNotification = functions.database.ref('/brq-sla/ONS').onWrite(
  async (snapshot, context) => {

    try {
      type NotificationMessagePayload = {
        tag?: string;
        body?: string;
        icon?: string;
        badge?: string;
        color?: string;
        sound?: string;
        title?: string;
        bodyLocKey?: string;
        bodyLocArgs?: string;
        clickAction?: string;
        titleLocKey?: string;
        titleLocArgs?: string;
        [key: string]: string | undefined;
      };

      type MessagingPayload = {
        data?: admin.messaging.DataMessagePayload;
        notification?: admin.messaging.NotificationMessagePayload;
      };

      type MessagingOptions = {
        dryRun?: boolean;
        priority?: string;
        timeToLive?: number;
        collapseKey?: string;
        mutableContent?: boolean;
        contentAvailable?: boolean;
        restrictedPackageName?: string;
        [key: string]: any | undefined;
      };
      const limites = {
        warning: 600,
        danger: 360,
        crazy: 120
      }
      const dataValue = snapshot.after.val();
      const colorHexFull = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      console.log('FUNCIONA!!!!', colorHexFull);
      const allTokens = await admin.database().ref('/DeviceId').once('value');
      const tokensPos = Object.keys(allTokens.val());
      const GerarBody = () => {
        let exteiras = ''
        dataValue.forEach(element => {
          exteiras += element.esteira + ' - ' + element.tfs + '    '
        });
        return exteiras
      }
      const hourToMinute = (hh: string): number => {
        const arrayHora = hh.split(':');
        return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
      }

      //Limpar Lista de Tokens
      const LimparTokenList = (response, tokens) => {
        // For each notification we check if there was an error.
        const tokensToRemove = {};
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.log('o q vem dentro do codigo de erro?', error.code)
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
              console.log('O que sera removido', tokensToRemove[`/deviceId/${tokens[index]}`]);
              tokensToRemove[`/deviceId/${tokens[index]}`] = null;
            }
          }
        });
        return admin.database().ref().update(tokensToRemove);
      }
      //Escolhe o Tipo de Notificação
      const pushType = (time: string): string => {
        let retorno = '';
        const minutos = hourToMinute(time);
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
      // Enviar notificação
      const SendPush = (pushColor: string) => {

        const payload = {
          notification: {
            body: GerarBody(),
            tap: "true",
            color: null,
            title: "Funciona!",
          }
        }

        allTokens.val().forEach(element => {
          payload.notification.color = pushColor
          admin.messaging().sendToDevice(element, payload).then((res) => {
            console.log('Enviei as notificações', res);
            LimparTokenList(res, tokensPos).then((final) => {
              console.log('O que a limpeza retornou?', final);
            }).catch((err) => {
              console.error('Erro na Limpeza', err)
            })
          }).catch((err) => {
            console.error('Erro no envio', err)
          })
          console.log('Notifications have been sent')
        });
      }


      const dataFromPush = {
        tokenList: allTokens.val(),
        Posicao_Token: tokensPos
      }
      console.log('Eu preciso disso =>!!!!', dataFromPush);
      dataValue.forEach(element => {
        pushType(element.data)

        switch (pushType(element.data)) {
          case 'warning':
            // envia cor amarela
            SendPush('#ffff00')
            break;
          case 'danger':
            // envia cor Vermelha
            SendPush('#ff0000')
            break;
          case 'crazy':
            // envia cor Vermelha
            SendPush('#000000')
            break;
          default:
            break;
        }
      });





      //const push = await admin.messaging().sendToDevice(iox, payload);
      console.log('O body gerado para o Payload', GerarBody());

      //const promises = [];
      // Listing all device tokens to send a notification to.
      // Get the list of device tokens.
      // Send notifications to all tokens.
      // const response = await admin.messaging().sendToDevice(tokens, payload);
      // await LimparTokenList(response, tokens);
      // console.log('Notifications have been sent and tokens cleaned up.', response)
    }
    catch (error) {
      console.log('O que deu errado aqui?', error);
    }
  })
