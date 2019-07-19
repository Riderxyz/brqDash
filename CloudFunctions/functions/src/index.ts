import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const pushNotification = functions.database.ref('/brq-sla/ONS').onWrite(
    async (snapshot, context) => {
        /*     interface NotificationMessagePayload  {
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
            
              interface MessagingPayload  {
                data?: admin.messaging.DataMessagePayload;
                notification?: admin.messaging.NotificationMessagePayload;
              };
            
              interface MessagingOptions  {
                dryRun?: boolean;
                priority?: string;
                timeToLive?: number;
                collapseKey?: string;
                mutableContent?: boolean;
                contentAvailable?: boolean;
                restrictedPackageName?: string;
                [key: string]: any | undefined;
              }; */

        interface PayLoadInterface {
            notification: {
                body: string
                tap: string
                color: string
                title: string
            }
        }
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
            const tokensPos = Object.keys(allTokens.val());
            const GerarBody = () => {
                let exteiras = ''
                dataValue.forEach((element: any) => {
                    exteiras += element.esteira + ' - ' + element.tfs + '    '
                });
                return exteiras
            }
            const hourToMinute = (hh: string): number => {
                const arrayHora = hh.split(':');
                return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
            }

            //Limpar Lista de Tokens
            const LimparTokenList = (response: any, tokens: any) => {
                // For each notification we check if there was an error.
                const tokensToRemove: any = {};
                response.results.forEach((result: any, index: any) => {
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

                const payload: PayLoadInterface = {
                    notification: {
                        body: GerarBody(),
                        tap: "true",
                        color: '',
                        title: "Funciona!",
                    }
                }
                allTokens.val().forEach((element: any) => {
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
            dataValue.forEach((element: any) => {
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
                        // envia cor Preta
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
export const CalculoMetaCumpridaGD = functions.database.ref('/brq-sla/gerenciamentoDiario').onWrite(
    async (snapshot, context) => {
        try {
            interface GDInterface {
                nome: string;
                dados: {
                    metas: {
                        prodMensal: number;
                        horasPrev: number;
                        horasEntregues: number;
                        metaCumprida: any;
                    }
                    saldo: any;
                    metaSemanal: {
                        semana1: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana2: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana3: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana4: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana5: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };

                    };
                };
            };
            let GDEmGeral: GDInterface[] = [];

            const getGD = (async () => {
                const result = await admin.database().ref('/brq-sla/gerenciamentoDiario').once('value');
                GDEmGeral = result.val();
                GDEmGeral.forEach((element: GDInterface) => {
                    const MetaCumprida = (element.dados.metas.horasEntregues / element.dados.metas.prodMensal) * 100
                    element.dados.metas.metaCumprida = Math.round(MetaCumprida)
                });
                await concluirPush(GDEmGeral);
            })

            const concluirPush = (async (arrModificado: GDInterface[]) => {
                await admin.database().ref('/brq-sla/gerenciamentoDiario').set(arrModificado);
                console.log('Vindo da linha 79', arrModificado);
            })

            await getGD();
        }
        catch (error) {
            console.log('erro da fução CalculoMetaCumprida', error);

        }
    })

export const CalculoSaldoGD = functions.database.ref('/brq-sla/gerenciamentoDiario').onWrite(
    async (snapshot, context) => {
        try {
            interface GDInterface {
                nome: string;
                dados: {
                    metas: {
                        prodMensal: number;
                        horasPrev: number;
                        horasEntregues: number;
                        metaCumprida: any;
                    }
                    saldo: any;
                    metaSemanal: {
                        semana1: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana2: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana3: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana4: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };
                        semana5: {
                            valor: number;
                            isSemanaAtual: boolean;
                        };

                    };
                };
            };
            let GDEmGeral: GDInterface[] = [];
            const getGD = (async () => {
                const result = await admin.database().ref('/brq-sla/gerenciamentoDiario').once('value');
                GDEmGeral = result.val();
                GDEmGeral.forEach((element: GDInterface) => {
                    let Saldo: any = (element.dados.metas.prodMensal - element.dados.metas.horasEntregues)
                    if (Saldo < 0) {
                        console.log('saldo é negativo da esteira ' + element.nome, Saldo);
                        Saldo = '✓'
                        element.dados.saldo = Saldo
                    } else {
                        element.dados.saldo = Saldo
                    }
                });
                await concluirPush(GDEmGeral);
            })

            const concluirPush = (async (arrModificado: GDInterface[]) => {
                await admin.database().ref('/brq-sla/gerenciamentoDiario').set(arrModificado);
                console.log('Vindo da linha 79', arrModificado);
            })

            await getGD();
        }
        catch (error) {
            console.log('erro da fução CalculoMetaCumprida', error);

        }
    })

export const onBlackDemanda = functions.database.ref('/brq-sla/ONS').onWrite(
    async (snapshot, context) => {
        try {

            interface DemandaDashboardModel {
                area: string;
                criticidade: string;
                data: string;
                dataFormatada: string;
                datafim: string;
                esteira: string;
                sistema: string;
                status: string;
                tfs: string;
                tiposla: string;
                titulo: string;
            }
            interface Notification {
                title: string;
                body: string;
                data: object;
                click_action: string;
                icon: string;
            }

            let arrOfNotification: Notification[] = [];
            let arrOfUsuariosObj = [];
            const sendPush = (async () => {
                const arrDemandas = await admin.database().ref('/brq-sla/ons').once('value');
                const arrUsuarios = await admin.database().ref('/brq-sla/usuario').once('value');
                // arrOfNotification = arrDemandas.val();
                arrOfUsuariosObj = arrUsuarios.val();
                arrDemandas.forEach((element: DemandaDashboardModel) => {
                    const minutos = hourToMin(element.data);
                    if (minutos <= 120) {
                        
                    }
                });
            })



            const hourToMin = ((hh: string) => {
                const arrayHora = hh.split(':');
                return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
            })

            const sendDangerNotification = ((element: DemandaDashboardModel,usuarios:any )=> {

            })
            const sendCrazyNotification = ((element: DemandaDashboardModel )=> {
                admin.messaging().sendMulticast
                
            })


        } catch (error) {

        }
    })  