import { DataFirebaseModel } from './../models/data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FormatService {
  private limites = {
    normal: {
      classe: {
        'background-color': '#3d3780',
        'color': 'black!important'
      },
      limite: null
    },
    warning: {
      classe: {
        'background-color': 'orange',
        'color': '#300c74',
        'font-weight': 'normal'
      },
      limite: 600
    },
    danger: {
      classe: {
        'background-color': 'red ',
        'color': '#fff'
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
  constructor() { }
  /**
   * Setter MontarColunaStatus
   *  Monta a coluna de Status da Grid
   */
  public MontarColunaStatus(param: any) {
    const dados: DataFirebaseModel = param.data;
    const html = '<br><span style=" font-size: 3.8em;" >'/* 60.8px */ + dados.status + '</span>';
    return html;
  }
  /**
   * Setter MontarColunaEsteira
   * Monta a coluna onde esta as esteiras e o numero da Demanda
   */
  public MontarColunaEsteira(param: any) {
    const dados: DataFirebaseModel = param.data;
    let html = '<br><span style="font-size: 4.3em;padding-top:10px;">'/* 68.8px */ + dados.esteira + ' - ' + dados.tfs + '</span>';
    html += '<br>';
    html += '<span style="font-size: 3.0em;">'/* 48px */ + dados.titulo + '</span>';
    return html;
  }
  /**
   * Setter MontarColunaRestante
   * Monta a coluna restante, que cuida do tempo
   */
  public MontarColunaRestante(param: any) {
    const dados: DataFirebaseModel = param.data;
    let html = '<br><span style=" font-size: 4.4em;padding-top:10px;" >' + dados.dataFormatada + '</span>';
    html += '<br>';
    html += '<span style="font-size: 3.0em" >' + dados.datafim + '</span>';
     return html;
  }

  public formatarLinha(params: DataFirebaseModel) {
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

  public hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }

}
