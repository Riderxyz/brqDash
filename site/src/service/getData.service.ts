import { DataFirebaseModel } from './../models/data.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class GetDataSrv {



  private _DataJson: DataFirebaseModel[] = [];
  constructor(public db: AngularFireDatabase) { }

  get ListarItems() {
    return this.db.list('brq-sla/ONS').valueChanges();
  }



  get ListarExteiras() {



    return '';
  }


  public set DataJson(value: DataFirebaseModel[]) {

    this._DataJson = value;
  }

  public get DataJson(): DataFirebaseModel[] {

    return this._DataJson;
  }

}
