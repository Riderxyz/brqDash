import { Component } from '@angular/core';
import * as lod from 'lodash';
import * as env from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dash';

  private gridApi;
  private gridColumnApi;

  columnDefs = [
    { headerName: 'Demanda', field: 'Demanda', width: 140 },
    { headerName: 'Data', field: 'Data_entrega', width: 80 },
    { headerName: 'Esteira', field: 'Esteira', width: 80 },
    // { headerName: 'Cor', field: 'Color', width: 60 }
  ];

  rowData = [{
    'Demanda': 'TFS-2330',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-03',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3815',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-09',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2660',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-17',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2790',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-03',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4483',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-10',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4493',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-17',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2846',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-05',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2513',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-05',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3784',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-14',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4922',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-26',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4404',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-17',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3958',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-23',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-2527',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-06',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4556',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-18',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4556',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-10',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4166',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-07',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3249',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-04',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4524',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-06',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2505',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-11',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4570',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-11',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4193',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-27',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4014',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-12',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3123',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-24',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3899',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-03',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2745',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-15',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4413',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-08',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4276',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-07',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2787',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-19',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4868',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-19',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4014',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-22',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-2673',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-06',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4193',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-26',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3061',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-13',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3161',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-23',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2867',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-11',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-3534',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-22',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2735',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-16',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-3311',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-17',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3326',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-17',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3949',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-01',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3731',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-09',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2660',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-10',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3917',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-22',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2598',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-16',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3662',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-18',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3657',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-08',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2673',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-03',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2560',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-28',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4171',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-25',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4300',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-08',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-3285',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-12',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2640',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-02',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3401',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-03',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3534',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-13',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4570',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-06',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3949',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-19',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4191',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-06',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2857',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-13',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2885',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-02',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3161',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-15',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3401',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-05',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3326',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-14',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2846',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-25',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2831',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-09',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4191',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-15',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3214',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-07',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4413',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-10',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2885',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-10',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4893',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-03',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3815',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-13',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4751',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-02',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4751',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-17',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4176',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-04',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4868',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-20',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-4526',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-20',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2885',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-19',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2505',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-06',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3832',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-07',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-3013',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-27',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-2447',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-26',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3414',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-14',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2563',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-25',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3253',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-19',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4379',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-08',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-3255',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-11',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2513',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-04',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2673',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-08',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-4014',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-09',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4493',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-27',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-2479',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-02-15',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-2563',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-03',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-4191',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-04',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2711',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-12',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3161',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-04',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-4191',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-02-22',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3899',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-17',
    'Esteira': 'SharePoint'
  }, {
    'Demanda': 'TFS-3249',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-02',
    'Esteira': 'Net Delphi'
  }, {
    'Demanda': 'TFS-3414',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-06',
    'Esteira': 'Mobile'
  }, {
    'Demanda': 'TFS-3167',
    'Tipo': 'Dimensionamento',
    'Data_entrega': '2017-03-15',
    'Esteira': 'BI'
  }, {
    'Demanda': 'TFS-2857',
    'Tipo': 'Entrega',
    'Data_entrega': '2017-03-04',
    'Esteira': 'SharePoint'
  }]

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;

    params.api.addGlobalListener(function (type, event) {
      if (type.indexOf('column') >= 0) {
        console.log('Got column event: ', event);
      }
    });
  }

}
