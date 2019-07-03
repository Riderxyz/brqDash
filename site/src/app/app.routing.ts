
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/pages/Dashboard/dashboard.component';
import { GDBoardComponent } from 'src/pages/GD-Board/gd-board.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent,  data: {animation: 'Dashboard'}, },
  { path: 'gdboard', component: GDBoardComponent,  data: {animation: 'GDboard'}, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
