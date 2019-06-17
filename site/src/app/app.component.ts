import { Component, TemplateRef, ViewChild, OnInit, ElementRef } from '@angular/core';
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
        const hh = +temp_d[0] + 'h ' + temp_d[1] + 'm';
        element.dataFormatada = hh;
        this.DataList.push(element);
        this.dataSrv.DataJson.push(element);
        this.dataSrv.DataJSalva.push(element);
      });
      this.esteiras = this.dataSrv.listaEsteiras();
      this.gridApi.setRowData(this.DataList);
    });
    this.dataSrv.ControleRemoto$.subscribe((items) => {
    });
    moment.locale('pt');
    timer(2000, 500).subscribe(() => {
      this.gridOptions.api.sizeColumnsToFit();
    });
    setTimeout(() => {
      this.splashScreenLoadOut();
    }, 3500);
    this.breakpointObserver
      .observe(['(min-width: 830px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 500px or over!', state);
          console.log(this.DataList[0]);
          this.ShowWhenSizable = false;
          this.gridOptions.api.sizeColumnsToFit();
        } else {
          this.splashScreenLoadOut();
          console.log('Viewport is getting smaller!', state);
          this.ShowWhenSizable = true;
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
    this.gridOptions = {
      columnDefs: this.columnDefs,
      enableSorting: true,
      headerHeight: 0,
      rowHeight: 100,
      getRowStyle: (params) => {
        return this.formatSrv.formatarGridColor(params.data);
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        params.api.sizeColumnsToFit();
      }
    };
  }

  showModalFiltro() {
    this.remoteControl.DashBoardAtivo();
    this.dialogService.open(this.Modal_Filtro);
  }

  splashScreenLoadOut() {
    const divAni = document.getElementById('animateSplash')
    console.log(divAni)
    divAni.addEventListener('animationend', ((res) => {
      console.log('terminei a animação', res);

    }));
    this.animationDiv.nativeElement.addEventListener('animationend', ((res) => {
      console.log('terminei a animação 23', res);
    }));
    if (this.DataList !== [] || this.DataList !== null || this.DataList !== undefined) {
      this.SplashScreen.animation = 'slideOutUp fast';
      setTimeout(() => {
        this.SplashScreen.show = false;
      }, 2000);
    } else {
      this.splashScreenLoadOut();
    }
  }
  filtrarLista(esteira, refs) {
    console.log('fatiou, passou', esteira);
    this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteira));
    refs.close();
  }


}
