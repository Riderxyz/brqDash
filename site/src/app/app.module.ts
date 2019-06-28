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
import { FloatingActionMenuModule } from 'ng2-floating-action-menu'
import { HttpClientModule } from '@angular/common/http';

// AngularFire
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// Service
import { GetDataSrv } from 'src/service/getData.service';
import { FormatService } from 'src/service/format.service';
import { RemoteControlService } from 'src/service/remoteControl.service';
import { CentralRxJsService } from 'src/service/centralRxjs.service';

// Paginas
import { DashboardComponent } from '../pages/Dashboard/dashboard.component';
import { GDBoardComponent } from '../pages/GD-Board/gd-board.component';

const AppRoutes: Routes = [
  { path: 'Home', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GDBoardComponent
  ],
  imports: [
    RouterModule.forRoot(
      AppRoutes, { enableTracing: false }
    ),
    HttpClientModule,
    FormsModule,
    FloatingActionMenuModule,
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
    GetDataSrv,
    FormatService,
    CentralRxJsService,
    RemoteControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
