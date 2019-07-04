import { Component, OnInit } from '@angular/core';
import { GetDataSrv } from 'src/service/getData.service';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { GDInterface } from 'src/models/gd.model';
import { GridOptions } from 'ag-grid-community';
@Component({
  selector: 'app-gd-board',
  templateUrl: './gd-board.component.html',
  styleUrls: ['./gd-board.component.scss']
})
export class GDBoardComponent implements OnInit {
  esteiras: GDInterface[] = [];
  public gridApi: any;
  public gridOptions: GridOptions;
  columnDefs = [];
  constructor(
    public dataSrv: GetDataSrv,
  ) { }

  ngOnInit() {
    this.dataSrv.ListarGerenciamento.subscribe((res: GDInterface[]) => {
      console.log('o q vem aqui para gerenciamento?', res);
      this.esteiras = res;
    });



    this.gridOptions = {
      columnDefs: this.createColumnDefs,
      enableSorting: true,
      rowHeight: 100,
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

  get createColumnDefs(): Array<any> {
    const that = this;
    return this.columnDefs = [
      {
        headerName: 'Esteira',
        field: 'esteira',
        width: 80,
        // height: 190,
        cellRenderer: this.formatNome,
      },
      {
        headerName: 'Horas Entregues',
        field: 'esteira',
        width: 80,
        // height: 190,
        cellRenderer: this.formatHoraEntregues,
      },
      {
        headerName: 'Horas Previstas',
        field: 'esteira',
        width: 80,
        // height: 190,
        cellRenderer: this.formatHoraPrevista,
      },
      {
        headerName: 'Meta Cumprida',
        field: 'esteira',
        width: 80,
        // height: 190,
        cellRenderer: this.formatMetaCumprida,
      },
      {
        headerName: 'Produção Mensal',
        field: 'esteira',
        width: 80,
        // height: 190,
        cellRenderer: this.formatProducaoMensal,
      }
    ];
  }



  formatNome(param: any) {
    const dados: GDInterface = param.data;
    const html = '<br><span class="ColunaStatus">' + dados.nome + '</span>';
    return html;
  }
  formatHoraEntregues(param: any) {
    const dados: GDInterface = param.data;
    const html = '<br><span class="ColunaStatus">' + dados.dados.metas.horasEntregues + '</span>';
    return html;
  }
  formatHoraPrevista(param: any) {
    const dados: GDInterface = param.data;
    const html = '<br><span class="ColunaStatus">' + dados.dados.metas.horasPrev + '</span>';
    return html;
  }
  formatMetaCumprida(param: any) {
    const dados: GDInterface = param.data;
    const html = '<br><span class="ColunaStatus">' + dados.dados.metas.metaCumprida + '</span>';
    return html;
  }
  formatProducaoMensal(param: any) {
    const dados: GDInterface = param.data;
    const html = '<br><span class="ColunaStatus">' + dados.dados.metas.prodMensal + '</span>';
    return html;
  }
}
