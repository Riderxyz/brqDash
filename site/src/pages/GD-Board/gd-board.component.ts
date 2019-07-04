import { Component, OnInit } from '@angular/core';
import { GetDataSrv } from 'src/service/getData.service';
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
    public dataSrv: GetDataSrv,
  ) { }

  ngOnInit() {
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
        console.log('esta pronto');
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
        field: 'esteira',
        cellClass: 'normalCell',
        width: 50,
        // height: 190,
        cellRenderer: this.formatNome,
      },
      {
        headerName: 'Produção Mensal',
        field: 'esteira',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatProducaoMensal,
      },
      {
        headerName: 'Horas Previstas',
        field: 'esteira',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatHoraPrevista,
      },
      {
        headerName: 'Horas Entregues',
        field: 'esteira',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatHoraEntregues,
      },
      {
        headerName: 'Meta Cumprida',
        field: 'esteira',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatMetaCumprida,
      },
      {
        headerName: 'Saldo',
        field: 'esteira',
        width: 25,
        cellStyle: { textAlign: 'center' },
        cellClass: 'normalCell',
        // height: 190,
        cellRenderer: this.formatMetaCumprida,
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
        cellRenderer: this.formatSemana1,
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
        cellRenderer: this.formatSemana2,
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
        cellRenderer: this.formatSemana3,
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
        cellRenderer: this.formatSemana4,
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
        cellRenderer: this.formatSemana5,
      },
    ];
  }


  formatNome(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.nome + '</span>';
    return html;
  }
  formatProducaoMensal(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.prodMensal + '</span>';
    /* const html = `<nb-card>
    <nb-card-header>` + dados.dados.metas.prodMensal + `</nb-card-header>
    </nb-card>` */
    return html;
  }
  formatHoraPrevista(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.horasPrev + '</span>';
    return html;
  }
  formatHoraEntregues(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.horasEntregues + '</span>';
    return html;
  }
  formatMetaCumprida(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.metaCumprida + '</span>';
    return html;
  }
  formatSaldo(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.saldo + '</span>';
    return html;
  }
  formatSemana1(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana1.valor + '</span>';
    return html;
  }
  formatSemana2(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana2.valor + '</span>';
    return html;
  }
  formatSemana3(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana3.valor + '</span>';
    return html;
  }
  formatSemana4(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana4.valor + '</span>';
    return html;
  }
  formatSemana5(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana5.valor + '</span>';
    return html;
  }
}
