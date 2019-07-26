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

        interface PayLoadInterface {
            notification: {
                title: string;
                body: string;
                click_action?: string;
                icon: string;
                color: string;
                badge?: string;
                tap: 'false' | 'true';
                tag?: string;
            }
            data?: any
        }

        interface UserObjInterface {
            email: string;
            password: any;
            uuid: string;
            nomeCompleto: string;
            dataNascimento: any;
            cargo: any;
            isAdm: boolean;
            exteira: string;
            tokenForPush: Array<string>
        }
        try {
            const limites = {
                warning: 600,
                danger: 360,
                crazy: 120
            }
            const iconForPush = {
                warning: 'https://firebasestorage.googleapis.com/v0/b/brq-sla.appspot.com/o/iconsForNotification%2FWarning.png?alt=media&token=38cd68a8-be35-4f97-a9dc-339407c63144',
                danger: 'https://firebasestorage.googleapis.com/v0/b/brq-sla.appspot.com/o/iconsForNotification%2FDanger.png?alt=media&token=8216d705-5455-43e9-99af-20e92f281487',
                crazy: 'https://firebasestorage.googleapis.com/v0/b/brq-sla.appspot.com/o/iconsForNotification%2FCrazy.png?alt=media&token=27637168-af0e-49a7-bb2a-805911b2eee9'
            }

            let arrDemandasObj: DemandaDashboardModel[] = [];
            let arrOfUsuariosObj: UserObjInterface[] = [];
            let arrTokensForCrazyNotifications: any[] = [];
            let arrTokensForDangerNotifications: any[] = [];
            let arrTokensForWarningNotifications: any[] = [];

            const ArrayDeDemandas = await admin.database().ref('/brq-sla/ons').once('value');
            const ArrayDeUsuarios = await admin.database().ref('/brq-sla/usuario').once('value');

            arrOfUsuariosObj = ArrayDeDemandas.val();
            await arrOfUsuariosObj.forEach((element) => {
                arrTokensForCrazyNotifications.concat(element.tokenForPush)
            })
            arrDemandasObj = ArrayDeUsuarios.val();

            arrDemandasObj.forEach((element: DemandaDashboardModel) => {
                const minutos = hourToMinute(element.data);
                if (minutos <= limites.warning) {
                    CreateWarningNotification(element);
                }
                if (minutos <= limites.danger) {
                    CreateDangerNotification(element);
                }
                if (minutos <= limites.crazy) {
                    CreateCrazyNotification(element);
                }
            });
            const hourToMinute = (hh: string): number => {
                const arrayHora = hh.split(':');
                return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
            }



            // Gerar Body 

            const gerarBody = ((minutos: number, demandaObj: DemandaDashboardModel) => {
                let retornoText = '';
                if (minutos <= limites.warning) {
                    retornoText = 'A demanda ' + demandaObj.tfs + ' - ' + demandaObj.titulo + ' esta com menos de 10 horas de duração!';
                }
                if (minutos <= limites.danger) {
                    retornoText = 'A demanda ' + demandaObj.tfs + ' - ' + demandaObj.titulo + ' esta com menos de 5 horas de duração!'
                }
                if (minutos <= limites.crazy) {
                    retornoText = 'A demanda ' + demandaObj.tfs + ' - ' + demandaObj.titulo + ' esta com menos de 2 horas de duração!'
                }
                return retornoText
            })
            // Enviar notificação Negra
            const CreateCrazyNotification = (demandaObj: DemandaDashboardModel) => {
                const payload: PayLoadInterface = {
                    notification: {
                        title: 'Demanda de ' + demandaObj.esteira + '!!!',
                        tap: 'true',
                        body: gerarBody(limites.crazy, demandaObj),
                        icon: iconForPush.crazy,
                        color: '#000000'
                    }
                }
                SendPushNotification(arrTokensForCrazyNotifications, payload)
            }


            // Enviar notificação Vermelha
            const CreateDangerNotification = (demandaObj: DemandaDashboardModel) => {
                arrOfUsuariosObj.forEach((element) => {
                    if (element.exteira === demandaObj.esteira) {
                        arrTokensForDangerNotifications = element.tokenForPush;
                        const payload: PayLoadInterface = {
                            notification: {
                                title: 'Demanda de ' + demandaObj.esteira + '.',
                                tap: 'true',
                                body: 'A demanda ' + demandaObj.tfs + ' - ' + demandaObj.titulo + ' esta com menos de 5 horas de duração!',
                                icon: iconForPush.danger,
                                color: '#000000'
                            }
                        }
                        // SendPushNotification(arrTokensForDangerNotifications, payload)
                    }
                })
            }
            // Enviar notificação Amarela
            const CreateWarningNotification = (demandaObj: DemandaDashboardModel) => {
                arrOfUsuariosObj.forEach((element) => {
                    arrTokensForCrazyNotifications.concat(element.tokenForPush)
                    if (element.exteira === demandaObj.esteira) {
                        arrTokensForWarningNotifications = element.tokenForPush;
                        const payload: PayLoadInterface = {
                            notification: {
                                title: 'Demanda de ' + demandaObj.esteira + '.',
                                tap: 'true',
                                body: 'A demanda ' + demandaObj.tfs + ' - ' + demandaObj.titulo + ' esta com menos de 10 horas de duração!',
                                icon: iconForPush.warning,
                                color: '#000000'
                            }
                        }
                       // SendPushNotification(arrTokensForWarningNotifications, payload)
                    }
                })
            }

            const SendPushNotification = ((token: Array<string>, payload: PayLoadInterface) => {
                token.forEach(element => {
                    admin.messaging().sendToDevice(element, payload).then((res) => {
                        console.log('Enviei as notificações', res);
                    }).catch((err) => {
                        console.error('Erro no envio', err)
                    })
                });
            })

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