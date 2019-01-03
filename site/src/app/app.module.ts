import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Nebular
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule, NbDialogModule } from '@nebular/theme';
import { NbThemeModule, NbDialogService } from '@nebular/theme';
import { NebularModule } from 'src/Modules/Nebular.module';


import { AppComponent } from './app.component';

// PrimeNg
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
//Ag-Grid
import { AgGridModule } from 'ag-grid-angular';

import { HttpClientModule } from '@angular/common/http';

// AngularFire
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { GetDataSrv } from 'src/service/getData.service';

const AppRoutes: Routes = [
  { path: 'Home', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(
      AppRoutes, { enableTracing: false }
    ),
    HttpClientModule,
    // AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // PrimeNG
    TableModule,
    CardModule,
    AgGridModule.withComponents([]),
    PanelModule,
    // Nebular
    NebularModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule,
    NbDialogModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [GetDataSrv],
  bootstrap: [AppComponent]
})
export class AppModule { }
