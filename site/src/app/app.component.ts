import { config } from './../service/config';
import { Component, TemplateRef, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { AngularFireDatabase } from '@angular/fire/database';
import { DemandaDashboardModel } from '../models/demandaDashboard.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


import { GetDataService } from 'src/service/getData.service';
import { FormatDashService } from '../service/formatDash.service';
import { RemoteControlService } from '../service/remoteControl.service';
import { CentralRxJsService } from '../service/centralRxjs.service';

import { SelectItemModel } from '../models/SelectItem.model';

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

  ShowWhenSizable: boolean;
  @ViewChild('animateSplash') animationDiv: ElementRef<any>;
  isAppLoaded = false;
  columnDefs = [];
  constructor(
    public dataSrv: GetDataService,
    public formatSrv: FormatDashService,
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
  }
}
