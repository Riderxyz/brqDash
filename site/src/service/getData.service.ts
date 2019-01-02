import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class GetDataSrv {

  constructor(public db: AngularFireDatabase) { }

  ListarItems(destino) {
    const retorno = [];
    const promise = new Promise((resolve, reject) => {
      this.db.list(destino).valueChanges().subscribe((s) => {
        s.forEach(element => {
          retorno.push(element);
        });
        resolve(retorno);
      });
    });
    return promise;
  }
}
