import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brq-sla.firebaseio.com"
});

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
  GDEmGeral = result.val()
  //   console.log(GDEmGeral);


  GDEmGeral.forEach((element: GDInterface) => {
    const MetaCumprida = (element.dados.metas.horasEntregues / element.dados.metas.prodMensal) * 100
    element.dados.metas.metaCumprida = Math.round(MetaCumprida)

    let Saldo: any = (element.dados.metas.prodMensal - element.dados.metas.horasEntregues)
    if (Saldo < 0) {
      console.log('saldo é negativo da esteira ' + element.nome, Saldo);
      Saldo = ' ✓ '
      element.dados.saldo = Saldo
    } else {
      element.dados.saldo = Saldo
    }
  });

  console.log('Vindo da linha 70', JSON.stringify(GDEmGeral[0]));

  concluirPush(GDEmGeral);
})
// getGD()

const token = 'dNzp47c-cO8:APA91bGLVwFoNcGlc8G_MzZcZPwj2q9pdRC_ktyXsgpYyn0H4DW0ZByIPqbAEi6QPI265GbC444f7RDAdrHEtWxZqDX10xFNx_-bUu1RrF6JzVOfDuNux_J0o3pXaYJzcdATLrOLdj3a';




const x = {
  notification: {
    title: 'Demanda de ' + 'demandaObj.esteira ' + '!!!',
    tap: "true",
    body: 'A demanda ' + 'demandaObj.tfs' + ' - ' + 'demandaObj.titulo' + ' esta com menos de duras horas de duração!',
    icon: 'https://firebasestorage.googleapis.com/v0/b/brq-sla.appspot.com/o/iconsForNotification%2Ffire.png?alt=media&token=67f703d1-024b-4ccb-a9f8-e36029ace1b2',
    color: '#000000',
    click_action : "https://brqdash.netlify.com/"
  }
}
const payload: any = x

admin.messaging().sendToDevice(token, payload)
  .then((onPushEnd) => {
    console.log(onPushEnd);
  })
  .catch((err) => {
    console.log('Deu erro', err)
  })
console.log('Vindo da linha 74', 322322222);

const concluirPush = ((arrModificado: GDInterface[]) => {
  admin.database().ref('/brq-sla/gerenciamentoDiario').set(arrModificado, ((res) => {
    console.log(res);
  }))
  console.log('Vindo da linha 79', arrModificado[0]);


})

