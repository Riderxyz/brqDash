import { DataFirebase } from './../models/data.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { interval } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'dash';

  public gridApi;
  private gridApiDim;
  public gridOptions: GridOptions;
  private gridColumnApiDim: any;
  public DataDimensionado: any = [];

  limites = {
    normal: {
      classe: {
        background: 'white !important',
        color: 'black!important'
      },
      limite: null
    },
    warning: {
      classe: {
        background: 'yellow!important',
        color: '#300c74',
        font: 'normal'
      },
      limite: 600
    },
    danger: {
      classe: {
        background: 'red !important',
        color: '#fff'
      },
      limite: 360
    },
    crazy: {
      classe: {
        background: 'black !important',
        font: 'bolder',
        color: '#fff'
      },
      limite: 120
    }
  };

  rowClassRules: any;
  columnDefs = [
    {
      headerName: 'Esteira',
      field: 'esteira',
      width: 50,
      /* height: 190, */
      cellRenderer: this.MontarColunaEsteira,
    },
    {
      headerName: 'Restante',
      field: 'data',
      width: 25,
      autoHeight: true,
      cellRenderer: this.MontarColunaRestante,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 25,
      autoHeight: true,
      /* cellRenderer: this.MontarColunaRestante, */
    },
  ];
  constructor(private http: HttpClient, public db: AngularFireDatabase) {
    this.db.list('brq-sla/ONS').valueChanges().subscribe((res) => {
      console.log('o que temos aqui hein?', res);
      this.DataDimensionado = res;
      this.gridApi.setRowData(res);
    });
    moment.locale('pt');
    this.gridOptions = {
      columnDefs: this.columnDefs,
      enableSorting: true,
      headerHeight: 0,
      rowHeight: 100,
      getRowStyle: (params) => {
        const minutos = this.hourToMinute(params.data.data);
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
      },

      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApiDim = params.columnApi;
        params.api.addGlobalListener((type, event) => {
          if (type.indexOf('rowDataChanged') >= 0) {
            console.log('Got column event: ', event);
          }
        });
        params.api.sizeColumnsToFit();
      }
    };

    /*     const that = this;
        this.rowClassRules = {
          'warning': (params) => {
            const minutos = that.hourToMinute(params.data.data);
            return ((minutos >= that.limites.danger) && (minutos <= that.limites.warning));
          },
          'danger': (params) => {
            const minutos = that.hourToMinute(params.data.data);
            return ((minutos >= that.limites.crazy) && (minutos <= that.limites.danger));
          },
          'crazy': (params) => {
            const minutos = that.hourToMinute(params.data.data);
            return (minutos <= that.limites.crazy);
          },
          'normal': (params) => {
            const minutos = that.hourToMinute(params.data.data);
            return (minutos > that.limites.warning);
          }
        }; */
  }


  MontarColunaCriticidade(param) {
    let html = '<br><span style=" font-size: 2.5em;" >' + param.data.criticidade + '</span>';
    html += '<br>';
    html += '<span style=" font-size: 2.5em" >' + param.data.status + '</span>';
    return html;
  }

  MontarColunaEsteira(param) {
    let html = '<br><span style="font-size: 2.7em;padding-top:10px;">' + param.data.esteira + ' - ' + param.data.tfs + '</span>';
    html += '<br>';
    html += '<span style="font-size: 2.0em;">' + param.data.titulo + '</span>';
    return html;
  }

  MontarColunaRestante(param) {
    const temp_d = param.data.data.split(':');
    const hh = +temp_d[0] + 'hs ' + temp_d[1] + ' mins';
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
    const temp_d = data.split(':');
    return +temp_d[0] + 'hs ' + temp_d[1] + ' mins';

  }

  /*
    rowClassRules() {
      const that = this;
      return {
        'warning': (params) => {
          const minutos = that.hourToMinute(params.data.data);
          return ((minutos >= that.limites.danger) && (minutos <= that.limites.warning));
        },
        'danger': (params) => {
          const minutos = that.hourToMinute(params.data.data);
          return ((minutos >= that.limites.crazy) && (minutos <= that.limites.danger));
        },
        'crazy': (params) => {
          const minutos = that.hourToMinute(params.data.data);
          return (minutos <= that.limites.crazy);
        },
        'normal': (params) => {
          const minutos = that.hourToMinute(params.data.data);
          return (minutos > that.limites.warning);
        }
      };
    } */

  onGridReady(params) {
    this.gridApiDim = params.api;
    this.gridApiDim.sizeColumnsToFit();
    this.gridColumnApiDim = params.columnApi;
    console.log('Eu existo!');

  }

  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }

}
