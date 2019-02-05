import { DataFirebaseModel } from './../models/data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FormatService {
  private _MontarColunaStatus: string;
  private _MontarColunaEsteira: string;
  private _MontarColunaRestante: string;
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
 * Getter MontarColunaStatus
 * Retorna a coluna de status da Grid
 */
  public get MontarColunaStatus() {
    return this._MontarColunaStatus;
  }
  /**
   * Setter MontarColunaStatus
   *  Monta a coluna de Status da Grid
   */
  public set MontarColunaStatus(param: any) {
    const dados: DataFirebaseModel = param.data;
    this._MontarColunaStatus = '<br><span style=" font-size: 3.8em;" >' + dados.status + '</span>';
  }
  /**
 * Getter MontarColunaEsteira
 * Retorna a coluna onde esta as esteiras e o numero da Demanda
 */
  public get MontarColunaEsteira() {
    return this._MontarColunaEsteira;
  }
  /**
   * Setter MontarColunaEsteira
   * Monta a coluna onde esta as esteiras e o numero da Demanda
   */
  public set MontarColunaEsteira(param: any) {
    const dados: DataFirebaseModel = param.data;
    this._MontarColunaEsteira = '<br><span style="font-size: 4.3em;padding-top:10px;">' + dados.esteira + ' - ' + dados.tfs + '</span>';
    this._MontarColunaEsteira += '<br>';
    this._MontarColunaEsteira += '<span style="font-size: 3.0em;">' + dados.titulo + '</span>';
  }
  /**
   * Setter MontarColunaRestante
   * Monta a coluna restante, que cuida do tempo
   */
  public set MontarColunaRestante(param: any) {
    this._MontarColunaRestante = '<br><span style=" font-size: 4.4em;padding-top:10px;" >' + param.data.dataFormatada + '</span>';
    this._MontarColunaRestante += '<br>';
    this._MontarColunaRestante += '<span style="font-size: 3.0em" >' + param.data.datafim + '</span>';
  }
  /**
 * Getter MontarColunaRestante
 * Retorna a coluna restante, que cuida do tempo
 */
  public get MontarColunaRestante() {
    return this._MontarColunaRestante;
  }

  public MontarColunaRestanteX(param) {

    this._MontarColunaRestante = '<br><span style=" font-size: 4.4em;padding-top:10px;" >' + param.data.dataFormatada + '</span>';
    this._MontarColunaRestante += '<br>';
    this._MontarColunaRestante += '<span style="font-size: 3.0em" >' + param.data.datafim + '</span>';
    return this._MontarColunaRestante;
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
