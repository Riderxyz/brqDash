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


  GDEmGeral.forEach((element:GDInterface) => {
    const MetaCumprida = (element.dados.metas.horasEntregues/element.dados.metas.prodMensal) * 100
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

console.log('Vindo da linha 70',JSON.stringify(GDEmGeral[0]));

concluirPush(GDEmGeral);
})
getGD()


const concluirPush = ((arrModificado:GDInterface[]) => {
  admin.database().ref('/brq-sla/gerenciamentoDiario').set(arrModificado, ((res) => {
    console.log(res);
  }))
console.log('Vindo da linha 79', arrModificado[0]);


})

