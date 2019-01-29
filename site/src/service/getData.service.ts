import { DataFirebaseModel } from './../models/data.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, filter, uniq, orderBy } from 'lodash';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class GetDataSrv {



  private _DataJson: DataFirebaseModel[] = [];
  private _DataJSalva: DataFirebaseModel[] = [];
  private _localRequisitado =  environment.NomeDashBoard;
  public ControleRemoto$ = new Subject<any>();
  constructor(public db: AngularFireDatabase) { }

  get ListarItems() {
    return this.db.list('brq-sla/ONS').valueChanges();
  }

  filtroEsteira(esteiras) {
    const result = [];
    esteiras.forEach(esteira => {
      filter(this.DataJSalva, { 'esteira': esteira.name }).forEach(x => {
        result.push(x);
      });

    });
    console.log(result);
    this.DataJson = orderBy(result, ['data', 'esteira']);
    // filter(this.DataJson,{'esteira': esteira});
    return this.DataJson;
  }

  listaEsteiras() {
    return map(uniq(map(this.DataJson, 'esteira')), (item, index) => {
      return { label: item, value: { id: index, name: item } };
    });
  }


  async DashBoardAtivo() {
    this.db.object('/dashBoardAtivo/' + this._localRequisitado).set({
      dash: 'Desenvolvimento',
      status: 'online',
      id:  Math.random().toString(36).substr(2, 9)
    });

  }


 async controleRemoto() {
  this.db.object('/dashBoardAtivo/' + this._localRequisitado).valueChanges().subscribe((res) => {
    console.log(`Dafuck?`, res);
  });

  }

  public set DataJson(value: DataFirebaseModel[]) {

    this._DataJson = value;
  }

  public get DataJson(): DataFirebaseModel[] {

    return this._DataJson;
  }

  public set DataJSalva(value: DataFirebaseModel[]) {

    this._DataJSalva = value;
  }

  public get DataJSalva(): DataFirebaseModel[] {

    return this._DataJSalva;
  }

}
