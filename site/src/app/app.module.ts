import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Localidade
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePT from '@angular/common/locales/pt';

// Nebular
import { NbSidebarModule, NbLayoutModule, NbDialogModule } from '@nebular/theme';
import { NbThemeModule } from '@nebular/theme';
import { NebularModule } from 'src/Modules/Nebular.module';
/* import { NbEvaIconsModule } from '@nebular/eva-icons'; */

// Ag-Grid
import { AgGridModule } from 'ag-grid-angular';

// AngularFire
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Paginas
import { DashboardComponent } from '../pages/Dashboard/dashboard.component';
import { GDBoardComponent } from '../pages/GD-Board/gd-board.component';
import { RoutingModule } from './app.routing';
import { FormatGDService } from '../service/formatGD.service';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

// Service
import { GetDataService } from '../service/getData.service';
import { FormatDashService } from '../service/formatDash.service';
import { RemoteControlService } from '../service/remoteControl.service';
import { CentralRxJsService } from '../service/centralRxjs.service';
import { LoginService } from '../service/login.service';
import { ServiceWorkerModule } from '@angular/service-worker';


registerLocaleData(localePT, 'pt');

const AngularFire = [
  AngularFireModule.initializeApp(environment.firebase),
AngularFireDatabaseModule,
AngularFireAuthModule,
AngularFireMessagingModule
]

const FormModules = [
  ReactiveFormsModule,
  FormsModule
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GDBoardComponent,
    LoginModalComponent
  ],
  entryComponents: [
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    ...FormModules,
    // CDK
    BrowserAnimationsModule,
    LayoutModule,
    // AngularFire
    ...AngularFire,
    // Angular
    AgGridModule.withComponents([]),
    // Nebular
    NebularModule.forRoot(),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
    // PWA
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    GetDataService,
    FormatDashService,
    FormatGDService,
    CentralRxJsService,
    RemoteControlService,
    LoginService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
