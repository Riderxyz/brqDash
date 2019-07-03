export interface GDInterface {

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

