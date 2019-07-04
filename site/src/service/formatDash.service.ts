import { DemandaDashboardModel } from '../models/demandaDashboard.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FormatDashService {
  private _limites = {
    normal: {
      classe: {
        'color': 'black!important'
      },
      limite: null
    },
    warning: {
      classe: {
        'background-image': 'linear-gradient(to right, #ffa100,  yellow)',
        'box-shadow': '0 3px 0 0 #db9d00, 0 2px 8px 0 #ffb600, 0 4px 10px 0 rgba(33, 7, 77, 0.5)',
        'text-shadow': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'border': 'none',
        'line-height': 'calc((1rem * 1.25) + 4px)',
        'color': '#300c74',
        'font-weight': 'normal'
      },
      limite: 600
    },
    danger: {
      classe: {
        'background-image': 'linear-gradient(to right, red, #ff386a)',
        'box-shadow': '0 3px 0 0 #db3078, 0 2px 8px 0 #ff388b, 0 4px 10px 0 rgba(33, 7, 77, 0.5)',
        'text-shadow': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'border': 'none',
        'line-height': 'calc((1rem * 1.25) + 4px)',
        'font-weight': 'normal',
        'color': '#fff',
      },
      limite: 360
    },
    crazy: {
      classe: {
        'background-color': 'black',
        'font-weight': 'bolder',
        'color': '#fff'
      },
      limite: 120
    }
  };

  private _limitesCard = {
    normal: {
      classe: 'normal',
      limite: null
    },
    warning: {
      classe: 'warning',
      limite: 600
    },
    danger: {
      classe: 'danger',
      limite: 360
    },
    crazy: {
      classe: 'crazy',
      limite: 120
    }
  };
  constructor() { }
  public get limites() {
    return this._limites;
  }
  public get limitesCard() {
    return this._limitesCard;
  }
  /**
   *  MontarColunaStatus
   *  Monta a coluna de Status da Grid
   */
  public MontarColunaStatus(param: any): string {
    const dados: DemandaDashboardModel = param.data;
    const html = '<br><span class="ColunaStatus">' + dados.status + '</span>';
    return html;
  }
  /**
   * MontarColunaEsteira
   * Monta a coluna onde esta as esteiras e o numero da Demanda
   */
  public MontarColunaEsteira(param: any): string {
    const dados: DemandaDashboardModel = param.data;
    let html = '<br><span class="ColunaEsteiraEsteira">' + dados.esteira + ' - ' + dados.tfs + '</span>';
    html += '<br>';
    html += '<span class="ColunaEsteiraTitulo">' + dados.titulo + '</span>';
    return html;
  }
  /**
   * MontarColunaRestante
   * Monta a coluna restante, que cuida do tempo
   */
  public MontarColunaRestante(param: any): string {
    const dados: DemandaDashboardModel = param.data;
    let html = '<br><span class="ColunaEsteiraDataFormatada">' + dados.dataFormatada + '</span>';
    html += '<br>';
    html += '<span class="ColunaEsteiraDataFim">' + dados.datafim + '</span>';
    return html;
  }
  /**
  * formatarCardColor:
  *
  * Formata a cor de fundo do card quando esta em uma tela
  * menor que 700px
  */
  public formatarGridColor(params: DemandaDashboardModel): object {
    const minutos = this.hourToMinute(params.data);
    // Normal
    if (minutos > this.limites.warning.limite) {
      return this.limites.normal.classe;

    }
    // Warning
    if (((minutos >= this.limites.danger.limite) && (minutos <= this.limites.warning.limite))) {
      return this.limites.warning.classe;

    }
    // Danger
    if (((minutos >= this.limites.crazy.limite) && (minutos <= this.limites.danger.limite))) {
      return this.limites.danger.classe;

    }
    if ((minutos <= this.limites.crazy.limite)) {
      return this.limites.crazy.classe;
    }
  }

  public formatarCardColor(params: DemandaDashboardModel): string {
    const minutos = this.hourToMinute(params.data);
    // Normal
    if (minutos > this.limitesCard.warning.limite) {
      return this.limitesCard.normal.classe;

    }
    // Warning
    if (((minutos >= this.limitesCard.danger.limite) && (minutos <= this.limitesCard.warning.limite))) {
      return this.limitesCard.warning.classe;

    }
    // Danger
    if (((minutos >= this.limitesCard.crazy.limite) && (minutos <= this.limitesCard.danger.limite))) {
      return this.limitesCard.danger.classe;

    }
    if ((minutos <= this.limitesCard.crazy.limite)) {
      return this.limitesCard.crazy.classe;
    }
  }
  public hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }

}



/*      'background-image': 'linear-gradient(to right, #ad59ff, #7659ff)',
        'box-shadow': '0 3px 0 0 #7e4ddb, 0 2px 8px 0 #9259ff, 0 4px 10px 0 rgba(33, 7, 77, 0.5)',
        'text-shadow': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'border': 'none',
        'line-height': 'calc((1rem * 1.25) + 4px)',
        'font-weight': 'normal',
        'color': '#fff' */
