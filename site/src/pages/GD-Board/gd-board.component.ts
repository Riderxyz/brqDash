import { FormatGDService } from './../../service/formatGD.service';
import { config } from '../../service/config';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/service/getData.service';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { GDInterface } from 'src/models/gd.model';
import { GridOptions, ColDef, ColGroupDef } from 'ag-grid-community';

@Component({
  selector: 'app-gd-board',
  templateUrl: './gd-board.component.html',
  styleUrls: ['./gd-board.component.scss']
})
export class GDBoardComponent implements OnInit {
  esteiras: GDInterface[] = [];
  public gridApi: any;
  public gridOptions: GridOptions;
  columnDefs: ColDef[] = [];
  constructor(
    public dataSrv: GetDataService,
    public centralRx: CentralRxJsService,
    public formatGDSrv: FormatGDService
  ) { }

  ngOnInit() {
    window.onresize = ((resizeObj) => {
      console.log('RESIZEBLE da linha 61', resizeObj);
      this.gridApi.sizeColumnsToFit();
    })
    this.dataSrv.ListarGerenciamento.subscribe((res: GDInterface[]) => {
      console.log('o q vem aqui para gerenciamento?', res);
      this.esteiras = res;
      this.gridOptions.api.setRowData(this.esteiras);
    });
    this.gridOptions = {
      columnDefs: this.createColumnDefs,
      enableSorting: true,
      headerHeight: 60,
      rowHeight: 120,
      onGridReady: (params) => {
        this.gridApi = params.api;
        params.api.sizeColumnsToFit();
        const comando = config.rxjsCentralKeys.GridReady;
        this.centralRx.sendData = comando;
        this.gridOptions.api.setRowData(this.esteiras);
        /*         const comando = config.rxjsCentralKeys.GridReady;
                this.centralRx.sendData = comando;
                this.isGridReady = true; */
      }
    };
  }



  setarGrid() {
    this.gridOptions.api.setRowData(this.esteiras);
  }
  renderizar() {
    this.gridOptions.api.sizeColumnsToFit();
  }

  get createColumnDefs(): Array<any> {
    const that = this;
    return this.columnDefs = [
      {
        headerName: 'Esteira',
        cellClass: 'normalCell',
        width: 50,
        // height: 190,
        cellRenderer: this.formatGDSrv.formatNome,
      },
      {
        headerName: 'Produção Mensal',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatGDSrv.formatProducaoMensal,
      },
      {
        headerName: 'Horas Previstas',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatGDSrv.formatHoraPrevista,
      },
      {
        headerName: 'Horas Entregues',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatGDSrv.formatHoraEntregues,
      },
      {
        headerName: 'Meta Cumprida',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatGDSrv.formatMetaCumprida,
      },
      {
        headerName: 'Saldo',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatGDSrv.formatSaldo,
      },
      {
        headerName: 'S1',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        cellClassRules: {
          'semanaAtual': ((params) => {
            const dados: GDInterface = params.data;
            return (dados.dados.metaSemanal.semana1.isSemanaAtual);
          })
        },
        cellRenderer: this.formatGDSrv.formatSemana1,
      },
      {
        headerName: 'S2',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        cellClassRules: {
          'semanaAtual': ((params) => {
            const dados: GDInterface = params.data;
            return (dados.dados.metaSemanal.semana2.isSemanaAtual);
          })
        },
        cellRenderer: this.formatGDSrv.formatSemana2,
      },
      {
        headerName: 'S3',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        cellClassRules: {
          'semanaAtual': ((params) => {
            const dados: GDInterface = params.data;
            return (dados.dados.metaSemanal.semana3.isSemanaAtual);
          })
        },
        cellRenderer: this.formatGDSrv.formatSemana3,
      },
      {
        headerName: 'S4',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        cellClassRules: {
          'semanaAtual': ((params) => {
            const dados: GDInterface = params.data;
            return (dados.dados.metaSemanal.semana4.isSemanaAtual);
          })
        },
        cellRenderer: this.formatGDSrv.formatSemana4,
      },
      {
        headerName: 'S5',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        cellClassRules: {
          'semanaAtual': ((params) => {
            const dados: GDInterface = params.data;
            return (dados.dados.metaSemanal.semana5.isSemanaAtual);
          })
        },
        cellRenderer: this.formatGDSrv.formatSemana5,
      },
    ];
  }
}
