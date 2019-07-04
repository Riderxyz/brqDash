import { Component, TemplateRef, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { GridOptions } from 'ag-grid-community';
import { AngularFireDatabase } from '@angular/fire/database';
import { NbDialogService } from '@nebular/theme';
import { DemandaDashboardModel } from '../../models/demandaDashboard.model';
import { GetDataService } from 'src/service/getData.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { timer, from, of } from 'rxjs';
import { map, debounce, delay } from 'rxjs/operators';
import { FormatDashService } from 'src/service/formatDash.service';
import { RemoteControlService } from 'src/service/remoteControl.service';
import { SelectItemModel } from 'src/models/SelectItem.model';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { config } from 'src/service/config';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  esteiras: SelectItemModel[];
  esteirasSelecionadas: any[];
  DataList: DemandaDashboardModel[] = [];
  SplashScreen = {
    show: true,
    animation: 'jello slow delay-1s'
  }
  ShowWhenSizable: boolean;
  @ViewChild('animateSplash') animationDiv: ElementRef<any>;
  @ViewChild('ModalShowFiltro') Modal_Filtro: TemplateRef<any>;
  public gridApi: any;
  public gridOptions: GridOptions;
  columnDefs = [];
  isGridReady = false;
  constructor(
    public db: AngularFireDatabase,
    public dialogService: NbDialogService,
    public dataSrv: GetDataService,
    public formatSrv: FormatDashService,
    public remoteControl: RemoteControlService,
    public breakpointObserver: BreakpointObserver,
    public centralRx: CentralRxJsService,
  ) {
    moment.locale('pt');
/*     this.remoteControl.controleRemoto.subscribe((esteiras) => {
      console.log('Controle remoto ativado');
      this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteiras));
    }); */
  }

  ngOnInit() {
    window.onresize = ((resizeObj) => {
      console.log('RESIZEBLE da linha 61', resizeObj);
      this.gridApi.sizeColumnsToFit();
    });

    this.dataSrv.ListarItems.subscribe((res: DemandaDashboardModel[]) => {
      console.log('peguei do firebase', res);

      this.DataList = res;
      this.dataSrv.DataJson = res;
      this.dataSrv.DataJSalva = res;
      this.esteiras = this.dataSrv.listaEsteiras();
      this.gridOptions.api.setRowData(this.DataList);
      if (this.isGridReady) {
        this.gridOptions.api.sizeColumnsToFit();
      }
    });

    this.gridOptions = {
      columnDefs: this.createColumnDefs,
      enableSorting: true,
      headerHeight: 0,
      rowHeight: 100,
      getRowStyle: (params) => {
        return this.formatSrv.formatarGridColor(params.data);
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        params.api.sizeColumnsToFit();
        console.log('grid de DashBoard Pronta!');

        const comando = config.rxjsCentralKeys.GridReady;
        this.centralRx.sendData = comando;
        this.isGridReady = true;
      }
    };
  }


  get createColumnDefs(): Array<any> {
    const that = this;
    return this.columnDefs = [
      {
        headerName: 'Esteira',
        field: 'esteira',
        width: 80,
        // height: 190,
        cellRenderer: that.formatSrv.MontarColunaEsteira,
      },
      {
        headerName: 'Restante',
        field: 'data',
        width: 20,
        autoHeight: true,
        cellRenderer: this.formatSrv.MontarColunaRestante,
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 30,
        autoHeight: true,
        cellRenderer: this.formatSrv.MontarColunaStatus,
      },
    ];
  }

  filtrarLista(esteira, refs) {
    console.log('fatiou, passou', esteira);
    this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteira));
    this.gridOptions.api.sizeColumnsToFit();
    refs.close();
  }

  showModalFiltro() {
    this.remoteControl.DashBoardAtivo();
    this.dialogService.open(this.Modal_Filtro);
  }


}
