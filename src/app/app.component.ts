import { Component } from '@angular/core';
import * as lod from 'lodash';
import * as env from './../environments/environment';

import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dash';

  private gridApi;
  private gridApiDim;
  private gridColumnApi; //2956
  private gridColumnApiDim;

  private DataDimensionado = {};

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
      cellRenderer: function (params) {
        const d = moment(params.data.DataInicio_SLA_Dimensionamento).format('DD MMM - HH:MM');
        const dateTime = new Date(params.data.DataInicio_SLA_Dimensionamento);
        console.log('datetime', dateTime);
        const diffHours = Math.abs(dateTime.getTime() - (moment.now() / 3600000));
        return '<span><div>' + d + '</div><div>' + diffHours + '</span>';
      }
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

  rowData = [{
    'Demanda': 'TFS-2330',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-03',
    'Esteira': 'SharePoint'
  }]

  constructor(private http: HttpClient) {
    console.log('entrou');
    moment.locale('pt');
    // Chamando aqui
    this.getWorkItens('em analise');
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
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;

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
  }

  calcDifDateInTime(date1: Date, date2: Date) {
    return Math.abs(date1.getTime() - date2.getTime()) / 3600000;
  }

}
