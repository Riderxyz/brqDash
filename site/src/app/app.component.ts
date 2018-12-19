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
        console.log(that.hourToMinute(params.data.data));
        console.log(that.limites.warning);
        console.log(minutos > that.limites.warning);


        return (minutos > that.limites.warning);
      }
    };
    //this.getWorkItens();
  }

  MontarColunaCriticidade(param) {
    let html = '<br><span style=" font-size: 2.9em;" >' + param.data.criticidade + '</span>';
    html += '<br>';
    html += '<span style=" font-size: 2.5em" >' + param.data.status + '</span>';
    return html;
  }

  MontarColunaEsteira(param) {
    console.log(param);
    // tslint:disable-next-line:max-line-length
    let html = '<br><span style="font-size: 4em;padding-top:10px;" >' + param.data.esteira + ' - ' + param.data.tfs + '</span>';
    html += '<br>';
    // html += '<span style=" font-size: 2.0em" >' + param.data.titulo + '</span>';
    html = '<br><span style=" font-size: 2.9em;" >' + param.data.criticidade + ' - ' + param.data.status + '</span>';
    return html;
  }

  MontarColunaRestante(param) {
    console.log(param);

    let html = '<br><span style=" font-size: 4em;padding-top:10px;" >' + param.data.data + '</span>';
    html += '<br>';
    html += '<span style="font-size: 2.5em" > ' + moment(param.data.datafim).format('DD-MMM') + '</span>';
    return html;
  }

  getTimeFromMins(mins) {
    const minutes = mins % 60;
    const hours = (mins - minutes) / 60;

    return hours + ':' + minutes;
  }

  private getWorkItens() {
    return this.http.get('http://10.2.1.127:9700/getWorkItem')
      .subscribe(data => {
        console.log('dados', data);
        this.DataDimensionado = data;
        this.gridApi.setRowData(data);
        return data;
      });
  }

  onGridReady(params) {
    console.log('in ready')
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
    console.log('set dim');
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
