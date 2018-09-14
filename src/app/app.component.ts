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
  private gridColumnApi;
  private gridColumnApiDim;

  private DataDimensionado = {};

  columnDefs = [
    {
      headerName: 'Demanda1',
      field: 'Demanda',
      width: 70,
      autoHeight: true,
      cellRenderer: function (params) {
        console.log('obj', params);
        return '<span style="display: block;line-height: normal;padding:10px;"><div style="font-weight: 800;">' +
          params.data.tfs + '</div>' + params.data.Title + '<br>' + params.data.AnalistaFornecedor + '</span>';
      }
    },
    {
      headerName: 'Tempo',
      field: 'Data_entrega',
      width: 30,
      autoHeight: true,
      cellRenderer: function (params) {
        const d = moment(params.data.DataInicio_SLA_Dimensionamento).format('DD MMM - HH:MM');
        const dateTime = new Date(params.data.DataInicio_SLA_Dimensionamento);
        console.log('datetime', dateTime)
        // const duration = moment.duration(dateTime);
        // console.log('duração,', duration);
        // const hours = duration.asHours();
        return '<span>' + d + '</span>'
      }
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

    this.getWorkItens('em analise')
  }

  private getWorkItens(tipo: string) {
    return this.http.get('http://localhost:9700/getWorkItem/tipo/' + tipo)
      .subscribe(data => {
        console.log(data);
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

}
