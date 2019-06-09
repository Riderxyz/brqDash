import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { GridOptions } from 'ag-grid-community';
import { AngularFireDatabase } from '@angular/fire/database';
import { NbDialogService } from '@nebular/theme';
import { DataFirebaseModel } from '../models/data.model';
import { GetDataSrv } from 'src/service/getData.service';
import { SelectItem } from 'primeng/api';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { FormatService } from 'src/service/format.service';
import { RemoteControlService } from 'src/service/remoteControl.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  esteiras: SelectItem[];
  esteirasSelecionadas: any[];
  DataList: DataFirebaseModel[] = [];
  title = 'dash';
  ShowWhenSizable: boolean;
  @ViewChild('ModalShowFiltro') Modal_Filtro: TemplateRef<any>;
  public gridApi: any;
  public gridOptions: GridOptions;
  columnDefs = [];
  constructor(
    public db: AngularFireDatabase,
    public dialogService: NbDialogService,
    public dataSrv: GetDataSrv,
    public formatSrv: FormatService,
    public remoteControl: RemoteControlService,
    public breakpointObserver: BreakpointObserver) {
    this.dataSrv.ListarItems.subscribe((res: DataFirebaseModel[]) => {
      this.DataList = [];
      this.dataSrv.DataJson = [];
      this.dataSrv.DataJSalva = [];
      res.forEach((element, key) => {
        const temp_d = element.data.split(':');
        const hh = +temp_d[0] + 'h:' + temp_d[1] + 'm';
        element.dataFormatada = hh;
        this.DataList.push(element);
        this.dataSrv.DataJson.push(element);
        this.dataSrv.DataJSalva.push(element);
        this.gridApi.setRowData(this.DataList);
      });
      this.esteiras = this.dataSrv.listaEsteiras();
    });
    this.dataSrv.ControleRemoto$.subscribe((items) => {
    });
    moment.locale('pt');
    timer(2000, 500).subscribe(() => {
      this.gridOptions.api.sizeColumnsToFit();
    });
    this.breakpointObserver
      .observe(['(min-width: 830px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 500px or over!', state);
          console.log(this.DataList[0]);

          this.ShowWhenSizable = false;
          this.gridOptions.api.sizeColumnsToFit();
        } else {
          console.log('Viewport is getting smaller!', state);
          this.ShowWhenSizable = true;

          // this.gridOptions.api.sizeColumnsToFit();
        }
      });
    this.remoteControl.controleRemoto.subscribe((esteiras) => {
    console.log('Controle remoto ativado');
      this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteiras));
    });
  }

  ngOnInit() {
    const that = this;
    this.columnDefs = [
      {
        headerName: 'Esteira',
        field: 'esteira',
        width: 80,
        /* height: 190, */
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
    this.gridOptions = {
      columnDefs: this.columnDefs,
      enableSorting: true,
      headerHeight: 0,
      rowHeight: 100,
      getRowStyle: (params) => {
        const minutos = this.formatSrv.hourToMinute(params.data.data);
        // Normal
        if (minutos > this.formatSrv.limites.warning.limite) {
          return this.formatSrv.limites.normal.classe;
        }
        // Warning
        if (((minutos >= this.formatSrv.limites.danger.limite) && (minutos <= this.formatSrv.limites.warning.limite))) {
          if (!this.ShowWhenSizable) {
            return {
              'background-color': 'yellow',
              'color': '#300c74',
              'font-weight': 'normal'
            };
          }
        }
        // Danger
        if (((minutos >= this.formatSrv.limites.crazy.limite) && (minutos <= this.formatSrv.limites.danger.limite))) {
          return this.formatSrv.limites.danger.classe;
        }
        // Crazy
        if ((minutos <= this.formatSrv.limites.crazy.limite)) {
          return this.formatSrv.limites.crazy.classe;
        }
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        params.api.addGlobalListener((type, event) => {
          if (type.indexOf('rowDataChanged') >= 0) {
            // console.log('Got column event: ', event);
          }
        });
        params.api.sizeColumnsToFit();
      }
    };
  }

  showModalFiltro() {
    this.remoteControl.DashBoardAtivo();
    this.dialogService.open(this.Modal_Filtro);
  }

  filtrarLista(esteira, refs) {
    console.log('fatiou, passou', esteira);
    this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteira));
    refs.close();
  }
}
