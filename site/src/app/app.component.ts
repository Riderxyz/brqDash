import { FabListInterface } from 'src/models/fabList.model';
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

import { SelectItemInterface } from '../models/SelectItem.model';

import { slideInAnimation } from './route.animation';
import { Router } from '@angular/router';

import { NbDialogService } from '@nebular/theme';
import { LoginModalComponent } from 'src/components/login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  DataList: DemandaDashboardModel[] = [];
  SplashScreen = {
    show: true,
    animation: 'jello slow delay-1s'
  };
  showFab = false;
  ShowWhenSizable: boolean;
  @ViewChild('animateSplash') animationDiv: ElementRef<any>;
  @ViewChild('dialog') dialog
  isAppLoaded = false;
  FabList: FabListInterface[] = [];
  constructor(
    public dataSrv: GetDataService,
    public formatSrv: FormatDashService,
    public breakpointObserver: BreakpointObserver,
    public centralRx: CentralRxJsService,
    public route: Router,
    private dialogService: NbDialogService
  ) {
    this.centralRx.DataSended.subscribe((res) => {
      if (res === config.rxjsCentralKeys.GridReady) {
        if (!this.isAppLoaded) {
          this.splashScreenLoadOut();
        }
      }
    });

    moment.locale('pt');
  }

  ngOnInit() {
    this.FabList = this.dataSrv.FabButtonList;
    this.dataSrv.ListarItems.subscribe((res: DemandaDashboardModel[]) => {
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
  GoForIt() {
    console.log('LINHA 60', this.route.url);
    /* this.showFab = !this.showFab; */
    this.dialogService.open(this.dialog);
  }



  showLogin() {
    this.dialogService.open(this.dialog);
  }
  GoTo(ev) {
    console.log(ev);
    switch (ev.comando) {
      case config.FabCommand.FiltrarGrid:
        this.showFab = false;
        if (this.route.url === '/dashboard') {
          const comando = config.rxjsCentralKeys.ShowFilterEsteiraDashBoard;
          this.centralRx.sendData = comando;
        } else {
          alert('Ainda será implementado');
        }
        break;
      case config.FabCommand.GoToDash:
        this.showFab = false;
        this.route.navigateByUrl('/dashboard');
        break;
      case config.FabCommand.GoToGD:
        this.showFab = false;
        this.route.navigateByUrl('/gdboard');
        break;
      case config.FabCommand.GoToUser:
        this.showLogin();
        this.showFab = false;
        break;
      default:
        break;
    }

  }
}
