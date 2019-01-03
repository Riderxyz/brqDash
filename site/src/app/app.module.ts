import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';
import { NgModule } from '@angular/core';

import { RouterModule, Router, Routes, CanActivate } from '@angular/router';

import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule } from '@nebular/theme';

import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

import { AgGridModule } from 'ag-grid-angular';
import { NebularModule } from 'src/Modules/Nebular.module';
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
    TableModule,
    CardModule,
    AgGridModule.withComponents([]),
    PanelModule,
    NebularModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [GetDataSrv],
  bootstrap: [AppComponent]
})
export class AppModule { }
