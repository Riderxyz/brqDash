import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { interval } from 'rxjs';
import { MobileService } from '../mobile-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: any = [];
  danger = true;
  warning = false;
  limites: any = {};

  demandas$: AngularFireList<any[]>;

  constructor(
    public mobSrv: MobileService,
    private http: HttpClient,
    public af: AngularFireDatabase) {
    const source = interval(10000);
    this.limites.warning = 600;
    this.limites.danger = 360;
    this.limites.crazy = 120;
    console.log('Iniciando');

    const subscribe = source
      .subscribe(val => {
        this.getWorkItens();
      });
    this.getWorkItens();
  }

  setstyle(params) {
    let retorno = '';
    const minutos = this.hourToMinute(params.data);
    if ((minutos >= this.limites.danger) && (minutos <= this.limites.warning)) {
      retorno = 'warning';
    } else {
      if ((minutos >= this.limites.crazy) && (minutos <= this.limites.danger)) {
        retorno = 'danger';
      } else {
        if (minutos <= this.limites.crazy) {
          retorno = 'crazy';
        } else {
          retorno = 'normal';
        }
      }
    }
    return retorno;
  }

  private getWorkItens() {
    console.log('chamando....');
    this.data = [];
    const ref = this.af.database.ref('brq-sla/ONS');
    ref.on('value', itemSnapshot => {
      itemSnapshot.forEach(itemSnap => {
        const element = itemSnap.val();
        element.id = element.tfs.split('-')[1];
        if (element.status === 'Em estimativa') {
          element.status = 'Estimativa';
        } else {
          if (element.status === 'Em desenvolvimento') {
            element.status = 'Desenv';
          }
        }
        this.data.push(element);
        return false;
      });
    });
    return this.data;
  }

  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }
}
