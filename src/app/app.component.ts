import { Component } from '@angular/core';
import * as lod from 'lodash';
import * as env from './../environments/environment';

import { HttpClient } from '@angular/common/http';

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
      width: 140,
      autoHeight: true,
      cellRenderer: function (params) {
        console.log('obj', params);
        return '<span><b>' + params.data.tfs + '<b><br>' + params.data.Title + '<br>' + params.data.AnalistaFornecedor + '</span>';
      }
    },
    {
      headerName: 'Tempo',
      field: 'Data_entrega',
      width: 80,
      autoHeight: true,
      cellRenderer: function (params) {
        console.log('obj', params);
        return '<span>' + params.data.DataInicio_SLA_Dimensionamento + '</span>';
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
