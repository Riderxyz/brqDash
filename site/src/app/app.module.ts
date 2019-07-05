import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Nebular
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule, NbDialogModule } from '@nebular/theme';
import { NbThemeModule, NbDialogService } from '@nebular/theme';
import { NebularModule } from 'src/Modules/Nebular.module';
// Ag-Grid
import { AgGridModule } from 'ag-grid-angular';

// Modules
import { HttpClientModule } from '@angular/common/http';

// AngularFire
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// Service
import { GetDataService } from 'src/service/getData.service';
import { FormatDashService } from 'src/service/formatDash.service';
import { RemoteControlService } from 'src/service/remoteControl.service';
import { CentralRxJsService } from 'src/service/centralRxjs.service';

// Paginas
import { DashboardComponent } from '../pages/Dashboard/dashboard.component';
import { GDBoardComponent } from '../pages/GD-Board/gd-board.component';
import { RoutingModule } from './app.routing';
import { FormatGDService } from 'src/service/formatGD.service';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

const AppRoutes: Routes = [
  { path: 'Home', component: AppComponent },
];

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
    FormsModule,
    // CDK
    LayoutModule,
    // AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
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
    RemoteControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
