
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './../component/dashboard/dashboard.component';

import { RouterModule } from '@angular/router';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule } from '@nebular/theme';

import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AgGridModule } from 'ag-grid-angular';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent
  ],
  imports: [
    NbCardModule,
    HttpClientModule,
    TableModule,
    CardModule,
    Ng2SmartTableModule,
    AgGridModule.withComponents([]),
    PanelModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    RouterModule.forRoot(
      [
        { path: '', component: DashboardComponent }
      ]
    ),
    // RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
