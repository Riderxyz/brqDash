import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Nebular
import { NbSidebarModule, NbLayoutModule, NbDialogModule } from '@nebular/theme';
import { NbThemeModule } from '@nebular/theme';
import { NebularModule } from 'src/Modules/Nebular.module';
// Ag-Grid
import { AgGridModule } from 'ag-grid-angular';

// AngularFire
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Service
import { GetDataService } from '../service/getData.service';
import { FormatDashService } from '../service/formatDash.service';
import { RemoteControlService } from '../service/remoteControl.service';
import { CentralRxJsService } from '../service/centralRxjs.service';
import { LoginService } from '../service/login.service';

// Paginas
import { DashboardComponent } from '../pages/Dashboard/dashboard.component';
import { GDBoardComponent } from '../pages/GD-Board/gd-board.component';
import { RoutingModule } from './app.routing';
import { FormatGDService } from '../service/formatGD.service';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

const AngularFire = [
  AngularFireModule.initializeApp(environment.firebase),
AngularFireDatabaseModule,
AngularFireAuthModule
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
    RoutingModule,
    HttpClientModule,
    ...FormModules,
    // CDK
    LayoutModule,
    // AngularFire
    ...AngularFire,
    // Angular
    AgGridModule.withComponents([]),
    // Nebular
    NebularModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule,
    NbDialogModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    GetDataService,
    FormatDashService,
    FormatGDService,
    CentralRxJsService,
    RemoteControlService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
