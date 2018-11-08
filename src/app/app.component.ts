import { Component } from '@angular/core';
import * as lod from 'lodash';
import * as env from './../environments/environment';

import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'dash';

  private gridApi;
  private gridApiDim;
  private gridColumnApi; //2956
  private gridColumnApiDim;

  private DataDimensionado = {};


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
    console.log('entrou');
    moment.locale('pt');
    // Chamando aqui

    this.rowClassRules = {
      'sick-days-warning': function (params) {
        let numSickDays = params.data.status;
        return numSickDays = 'true';
      },
      'sick-days-breach': 'false'
    };
    this.getWorkItens();
  }

  private getWorkItens() {
    return this.http.get('http://localhost:9700/getWorkItem')
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

  calcDifDateInTime(date1: Date, date2: Date) {
    return Math.abs(date1.getTime() - date2.getTime()) / 3600000;
  }


}
