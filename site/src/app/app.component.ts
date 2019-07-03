import { config } from './../service/config';
import { Component, TemplateRef, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { GridOptions } from 'ag-grid-community';
import { AngularFireDatabase } from '@angular/fire/database';
import { NbDialogService } from '@nebular/theme';
import { DemandaDashboardModel } from '../models/demandaDashboard.model';
import { GetDataSrv } from 'src/service/getData.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { timer, from, of } from 'rxjs';
import { map, debounce, delay } from 'rxjs/operators';
import { FormatService } from 'src/service/format.service';
import { RemoteControlService } from 'src/service/remoteControl.service';


import { FloatingActionButton } from 'ng2-floating-action-menu';
import { SelectItemModel } from 'src/models/SelectItem.model';
import { CentralRxJsService } from 'src/service/centralRxjs.service';

import { slideInAnimation } from './route.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  esteiras: SelectItemModel[];
  esteirasSelecionadas: any[];
  DataList: DemandaDashboardModel[] = [];
  SplashScreen = {
    show: true,
    animation: 'jello slow delay-1s'
  }
  fabButton: FloatingActionButton[] = [{
    iconClass: 'nb-menu',
    label: 'follow me on github',
    onClick: function () {
      console.log('vindo do primeiro');

    }
  },
  {
    iconClass: 'ion-social-facebook',
    label: 'nb-user',
    onClick: function () {
      console.log('vindo do segundo');
    }
  }];
  ShowWhenSizable: boolean;
  @ViewChild('animateSplash') animationDiv: ElementRef<any>;
  @ViewChild('ModalShowFiltro') Modal_Filtro: TemplateRef<any>;
  public gridApi: any;
  public gridOptions: GridOptions;

  isAppLoaded = false;
  columnDefs = [];
  constructor(
    public db: AngularFireDatabase,
    public dialogService: NbDialogService,
    public dataSrv: GetDataSrv,
    public formatSrv: FormatService,
    public remoteControl: RemoteControlService,
    public breakpointObserver: BreakpointObserver,
    public centralRx: CentralRxJsService
  ) {
    this.centralRx.DataSended.subscribe((res) => {
      console.log('LINHA 66 do appComponent', res);
      if (res === config.rxjsCentralKeys.GridReady) {
        if (!this.isAppLoaded) {
          this.splashScreenLoadOut();
        }
      }
    });

    moment.locale('pt');
  }

  ngOnInit() {
    this.dataSrv.ListarItems.pipe(
      map((resultadoMap: DemandaDashboardModel[]) => {
        resultadoMap.forEach((element) => {
          const temp_d = element.data.split(':');
          const hh = +temp_d[0] + 'h ' + temp_d[1] + 'm';
          element.dataFormatada = hh;
        });
        this.DataList = [];
        this.dataSrv.DataJson = [];
        this.dataSrv.DataJSalva = [];
        return resultadoMap;
      })
    ).subscribe((res: DemandaDashboardModel[]) => {
      /* console.log('LINHA 64', res); */
      this.DataList = res;
      this.dataSrv.DataJson = res;
      this.dataSrv.DataJSalva = res;

    });
   this.breakpointObserver
      .observe(['(min-width: 830px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 500px or over!', state);
          this.ShowWhenSizable = false;
        } else {
          console.log('Viewport is getting smaller!', state);
          this.ShowWhenSizable = true;
        }
      });
  }


  splashScreenLoadOut() {
    console.log('Entrei na função de splashArt');
    this.animationDiv.nativeElement.addEventListener('animationend', ((res) => {
      console.log('terminei a animação 23', res);
      if (res.animationName === 'jello') {
        if (this.DataList !== [] || this.DataList !== null || this.DataList !== undefined) {
          this.SplashScreen.animation = 'slideOutUp fast';
        }
      }
      if (res.animationName === 'slideOutUp') {
        this.SplashScreen.show = false;
        this.isAppLoaded = true;
        this.splashScreenLoadOut();
      }
    }));
    /*         if (this.DataList !== [] || this.DataList !== null || this.DataList !== undefined) {
              setTimeout(() => {
              }, 2000);
            } else {
            } */
  }


  filtrarLista(esteira, refs) {
    console.log('fatiou, passou', esteira);
    this.gridApi.setRowData(this.dataSrv.filtroEsteira(esteira));
    refs.close();
  }


}
