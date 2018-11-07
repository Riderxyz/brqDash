import { Component } from '@angular/core';
import * as lod from 'lodash';
import * as env from './../environments/environment';

import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';
import * as mom from 'moment-business-time'
import 'moment/locale/pt-br';

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
    moment.locale('pt-BR', {
      workinghours: {
        0: null,
        1: ['09:00:00', '18:00:00'],
        2: ['09:00:00', '18:00:00'],
        3: ['09:00:00', '18:00:00'],
        4: ['09:00:00', '18:00:00'],
        5: ['09:00:00', '18:00:00'],
        6: null
      },
      holidays: [
        '*-12-25'
      ]
    });

    let mins = mom('2015-02-27T16:22:00Z').workingDiff(moment('2015-02-20T12:00:00Z'), 'minutes', true);
    console.log('TIME DIFF', mins)

    let h = mins / 60;
    let m = mins % 60;
    console.log('simples ', this.getTimeFromMins(mins));

    console.log(moment.utc().hours(h).minutes(m).format('hh:mm'));

  }

  getTimeFromMins(mins) {
    const minutes = mins % 60;
    const hours = (mins - minutes) / 60;

    return hours + ':' + minutes;
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
