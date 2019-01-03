import { DataFirebaseModel } from './../models/data.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, filter, uniq, orderBy } from 'lodash';

@Injectable()
export class GetDataSrv {



  private _DataJson: DataFirebaseModel[] = [];
  public DataJSalva: DataFirebaseModel[] = [];
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


  public set DataJson(value: DataFirebaseModel[]) {

    this._DataJson = value;
  }

  public get DataJson(): DataFirebaseModel[] {

    return this._DataJson;
  }

}