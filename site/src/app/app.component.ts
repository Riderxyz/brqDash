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
      field: 'esteira',
      width: 70,
      autoHeight: true,

    },
    {
      headerName: 'Sistema',
      field: 'sistema',
      width: 50,
      autoHeight: true,
    },
    {
      headerName: 'TFS ID',
      field: 'tfs',
      width: 50,
      autoHeight: true,
    },
    {
      headerName: 'Criticidade',
      field: 'criticidade',
      width: 50,
      autoHeight: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 50,
      autoHeight: true,
    },
    {
      headerName: 'Tipo SLA',
      field: 'tiposla',
      width: 50,
      autoHeight: true,
    },
    {
      headerName: 'Restante',
      field: 'data',
      width: 50,
      autoHeight: true,
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
      }
    };
    this.getWorkItens();
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
        this.gridApiDim.setRowData(data);
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

  // calcDifDateInTime(date1: Date, date2: Date) {
  //   return Math.abs(date1.getTime() - date2.getTime()) / 3600000;
  // }

  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }

}
