import { config } from './../service/config';
import { Component, TemplateRef, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { GridOptions } from 'ag-grid-community';
import { AngularFireDatabase } from '@angular/fire/database';
import { NbDialogService } from '@nebular/theme';
import { DataFirebaseModel } from '../models/data.model';
import { GetDataSrv } from 'src/service/getData.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { timer } from 'rxjs';
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
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  esteiras: SelectItemModel[];
  esteirasSelecionadas: any[];
  DataList: DataFirebaseModel[] = [];
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
  }

  showModalFiltro() {
    this.remoteControl.DashBoardAtivo();
    this.dialogService.open(this.Modal_Filtro);
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
