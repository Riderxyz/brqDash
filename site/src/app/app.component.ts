import { Component, TemplateRef, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
        background: 'white !important',
        color: 'black!important'
      },
      limite: null
    },
    warning: {
      classe: {
        background: 'yellow!important',
        color: '#300c74',
        font: 'normal'
      },
      limite: 600
    },
    danger: {
      classe: {
        background: 'red !important',
        color: '#fff'
      },
      limite: 360
    },
    crazy: {
      classe: {
        background: 'black !important',
        font: 'bolder',
        color: '#fff'
      },
      limite: 120
    }
  };

  rowClassRules: any;
  columnDefs = [
    {
      headerName: 'Esteira',
      field: 'esteira',
      width: 80,
      /* height: 190, */
      cellRenderer: this.MontarColunaEsteira,
    },
    {
      headerName: 'Restante',
      field: 'data',
      width: 20,
      autoHeight: true,
      cellRenderer: this.MontarColunaRestante,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 30,
      autoHeight: true,
      cellRenderer: this.MontarColunaStatus,
    },
  ];
  constructor(
    public db: AngularFireDatabase,
    public dialogService: NbDialogService,
    public dataSrv: GetDataSrv,
    public breakpointObserver: BreakpointObserver) {
    this.dataSrv.ListarItems.subscribe((res: DataFirebaseModel[]) => {
      this.DataList = [];
      this.dataSrv.DataJson = [];
      this.dataSrv.DataJSalva = [];
      res.forEach((element, key) => {
        const temp_d = element.data.split(':');
        const hh = +temp_d[0] + 'h ' + temp_d[1] + 'm';
        element.data = hh;
        this.DataList.push(element);
        this.dataSrv.DataJson.push(element);
        this.dataSrv.DataJSalva.push(element);
        this.gridApi.setRowData(this.DataList);
      });
      /* this.dataSrv.DataJson = res;
      this.dataSrv.DataJSalva = res;

      this.gridApi.setRowData(res);
      this.DataList = res; */
      this.esteiras = this.dataSrv.listaEsteiras();
    });



    this.dataSrv.ControleRemoto$.subscribe((items) => {

    });
    moment.locale('pt');
    this.gridOptions = {
      columnDefs: this.columnDefs,
      enableSorting: true,
      headerHeight: 0,
      rowHeight: 100,
      getRowStyle: (params) => {
        const minutos = this.hourToMinute(params.data.data);
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

    timer(2000, 500).subscribe(() => {
      this.gridOptions.api.sizeColumnsToFit();
    });

    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 500px or over!');
          this.ShowWhenSizable = false;
          this.gridOptions.api.sizeColumnsToFit();
        } else {
          console.log('Viewport is getting smaller!');
          this.ShowWhenSizable = true;
         // this.gridOptions.api.sizeColumnsToFit();
        }
      });
  }


  MontarColunaStatus(param) {
    const dados: DataFirebaseModel = param.data;
    const html = '<br><span style=" font-size: 3.8em;" >' + dados.status + '</span>';
    return html;
  }

  MontarColunaEsteira(param) {
    let html = '<br><span style="font-size: 4.3em;padding-top:10px;">' + param.data.esteira + ' - ' + param.data.tfs + '</span>';
    html += '<br>';
    html += '<span style="font-size: 3.0em;">' + param.data.titulo + '</span>';
    return html;
  }

  MontarColunaRestante(param) {
    const temp_d = param.data.data.split(':');
    const hh = +temp_d[0] + 'h ' + temp_d[1] + 'm';
    let html = '<br><span style=" font-size: 4.4em;padding-top:10px;" >' + param.data.data + '</span>';
    html += '<br>';
    html += '<span style="font-size: 3.0em" >  ' + param.data.datafim + '</span>';
    return html;
  }

  getTimeFromMins(mins) {
    const minutes = mins % 60;
    const hours = (mins - minutes) / 60;

    return hours + ':' + minutes;
  }

  formatdata(data): string {
    const temp_d = data.split(':');
    return +temp_d[0] + 'h ' + temp_d[1] + 'm';

  }

  formatarLinha(params) {
    const minutos = this.hourToMinute(params.data.data);
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
  }

  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
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
