import { Component } from '@angular/core';
import { interval } from 'rxjs/observable/interval';

import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'dash';
  that = this;

  private gridApi;
  private gridApiDim;
  private gridColumnApi;
  private gridColumnApiDim;

  private DataDimensionado = {};

  limites: any = {};

  rowClassRules: any;
  columnDefs = [
    {
      headerName: 'Esteira',
      field: 'Esteira',
      width: 50,
      height: 190,
      cellRenderer: this.MontarColunaEsteira,
    },
    {
      headerName: 'Restante',
      field: 'data',
      width: 25,
      autoHeight: true,
      cellRenderer: this.MontarColunaRestante,
    },
  ];

  constructor(private http: HttpClient) {
    moment.locale('pt');
    this.limites.warning = 600;
    this.limites.danger = 360;
    this.limites.crazy = 120;
    const source = interval(10000);

    const subscribe = source
      .subscribe(val => {
        this.getWorkItens();
      });

    const that = this;
    this.rowClassRules = {
      'warning': function (params) {
        const minutos = that.hourToMinute(params.data.data);
        return ((minutos >= that.limites.danger) && (minutos <= that.limites.warning));
      },
      'danger': function (params) {
        const minutos = that.hourToMinute(params.data.data);
        return ((minutos >= that.limites.crazy) && (minutos <= that.limites.danger));
      },
      'crazy': function (params) {
        const minutos = that.hourToMinute(params.data.data);
        return (minutos <= that.limites.crazy);
      },
      'normal': function (params) {
        const minutos = that.hourToMinute(params.data.data);
        return (minutos > that.limites.warning);
      }
    };
    //this.getWorkItens();
  }

  MontarColunaCriticidade(param) {
    let html = '<br><span style=" font-size: 2.5em;" >' + param.data.criticidade + '</span>';
    html += '<br>';
    html += '<span style=" font-size: 2.5em" >' + param.data.status + '</span>';
    return html;
  }

  MontarColunaEsteira(param) {
    let html = '<br><span style="font-size: 3.7em;padding-top:10px;" >' + param.data.esteira + ' - ' + param.data.tfs + '</span>';
    html += '<br>';
    html += '<span style=" font-size: 3.0em;" >' + param.data.criticidade + ' - ' + param.data.status + '</span>';
    return html;
  }

  MontarColunaRestante(param) {
    const temp_d = param.data.data.split(':');
    const hh = +temp_d[0] + 'hs ' + temp_d[1] + ' mins'
    let html = '<br><span style=" font-size: 3.7em;padding-top:10px;" >' + hh + '</span>';
    html += '<br>';
    html += '<span style="font-size: 3.0em" > ' + moment(param.data.datafim).format('DD-MMM') + '</span>';
    return html;
  }

  getTimeFromMins(mins) {
    const minutes = mins % 60;
    const hours = (mins - minutes) / 60;

    return hours + ':' + minutes;
  }

  formatdata(data): string {
    let temp_d = data.split(':');
    return +temp_d[0] + 'hs ' + temp_d[1] + ' mins'

  }

  private getWorkItens() {
    return this.http.get('http://10.2.1.127:9700/getWorkItem')
      .subscribe(data => {
        this.DataDimensionado = data;
        this.gridApi.setRowData(data);
        return data;
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;

    this.gridApi.onCellValueChanged = function (event) {
      this.gridApi.rowStyle = { background: 'coral' };
    };
    params.api.addGlobalListener(function (type, event) {
      if (type.indexOf('column') >= 0) {
        //   console.log('Got column event: ', event);
      }
    });
  }

  onGridReadyDim(params) {
    this.gridApiDim = params.api;
    this.gridApiDim.sizeColumnsToFit();
    this.gridColumnApiDim = params.columnApi;
    this.gridApiDim.rowStyle = { background: 'coral' };
  }

  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }

}
