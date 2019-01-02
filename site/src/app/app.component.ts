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
  that = this;

  public gridApi;
  private gridApiDim;
  private gridColumnApi;
  private gridColumnApiDim;
  public gridOptions: GridOptions;
  private DataDimensionado: any = [];

  limites: any = {};

  /* rowClassRules: any; */
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
      this.gridApi.setRowData(res);
    });
    moment.locale('pt');
    this.limites.warning = 600;
    this.limites.danger = 360;
    this.limites.crazy = 120;

    this.gridOptions = {
      columnDefs: this.columnDefs,
      /* rowClassRules: this.rowClassRules(), */
      enableSorting: true,
      headerHeight: 0,
      rowHeight: 100,
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
  }

  private getWorkItens() {
    /*     return this.http.get('http://10.2.1.127:9700/getWorkItem')
          .subscribe(data => {
            console.log(data);
            // this.DataDimensionado = data;
            // this.gridApi.setRowData(data);
            return data;
          }); */
  }

  /*   onGridReady(params) {
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
    } */

  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }

}
