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


  list() {
    const MXR = this.DataJson.filter((item, index) => {
      console.log('Linha 21', item.esteira);
      console.log('Linha 21', index);
      return this.DataJson.indexOf(item) === index;
    });
    console.log(MXR);
    /*  this.DataJson.forEach((element: DataFirebaseModel) => {
       console.log(element.esteira);
     }); */
  }


  public set DataJson(value: DataFirebaseModel[]) {

    this._DataJson = value;
  }

  public get DataJson(): DataFirebaseModel[] {

    return this._DataJson;
  }

}
