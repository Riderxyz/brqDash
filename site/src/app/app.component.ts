import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { GridOptions } from 'ag-grid-community';
import { AngularFireDatabase } from '@angular/fire/database';
import { NbDialogService } from '@nebular/theme';
import { DataFirebaseModel } from './../models/data.model';
import { GetDataSrv } from 'src/service/getData.service';
import { SelectItem } from 'primeng/api';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { FormatService } from 'src/service/format.service';
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
  public gridApi;
  public gridOptions: GridOptions;
  public DataDimensionado: any = [];
  limites = {
    normal: {
      classe: {
      //  'background-color': this.formatSrv.whatColor(this.ShowWhenSizable),
        'color': 'black!important'
      },
      limite: null
    },
    warning: {
      classe: {
        'background-color': 'orange',
        'color': '#300c74',
        'font-weight': 'normal'
      },
      limite: 600
    },
    danger: {
      classe: {
        'background-color': 'red ',
        'color': '#fff'
      },
      limite: 360
    },
    crazy: {
      classe: {
        'background-color': 'black',
        'font-weight': 'bolder',
        'color': '#fff'
      },
      limite: 120
    }
  };
  rowClassRules: any;
  columnDefs = [];
  constructor(
    public db: AngularFireDatabase,
    public dialogService: NbDialogService,
    public dataSrv: GetDataSrv,
    public formatSrv: FormatService,
    public breakpointObserver: BreakpointObserver) {
    this.dataSrv.ListarItems.subscribe((res: DataFirebaseModel[]) => {
      this.DataList = [];
      this.dataSrv.DataJson = [];
      this.dataSrv.DataJSalva = [];
      res.forEach((element, key) => {
        const temp_d = element.data.split(':');
        const hh = +temp_d[0] + 'h :' + temp_d[1] + 'm';
        element.dataFormatada = hh;
        this.DataList.push(element);
        this.dataSrv.DataJson.push(element);
        this.dataSrv.DataJSalva.push(element);
        this.gridApi.setRowData(this.DataList);
      });
      console.log(this.DataList);
      this.esteiras = this.dataSrv.listaEsteiras();
    });
    this.dataSrv.ControleRemoto$.subscribe((items) => {
    });
    moment.locale('pt');
    timer(2000, 500).subscribe(() => {
      this.gridOptions.api.sizeColumnsToFit();
    });

    this.breakpointObserver
      .observe(['(min-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 500px or over!', state);
          this.ShowWhenSizable = false;
          this.gridOptions.api.sizeColumnsToFit();
        } else {
          console.log('Viewport is getting smaller!', state);
          this.ShowWhenSizable = true;

          // this.gridOptions.api.sizeColumnsToFit();
        }
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
        if (minutos > this.limites.warning.limite) {
          return this.limites.normal.classe;
        }
        // Warning
        if (((minutos >= this.limites.danger.limite) && (minutos <= this.limites.warning.limite))) {
          return this.limites.warning.classe;
        }
        // Danger
        if (((minutos >= this.limites.crazy.limite) && (minutos <= this.limites.danger.limite))) {
          return this.limites.danger.classe;
        }
        if ((minutos <= this.limites.crazy.limite)) {
          return this.limites.crazy.classe;
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
    //  console.log(this.dataSrv.DataJson);
    this.dataSrv.DashBoardAtivo();
    this.dialogService.open(this.Modal_Filtro);
  }

  filtrarLista(esteira, refs) {
    console.log('fatiou, passou', esteira);
    this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteira));
    refs.close();
  }
}
