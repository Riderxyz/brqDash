import { DemandaDashboardModel } from '../models/demandaDashboard.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, filter, uniq, orderBy } from 'lodash';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { config } from './config';
import { FabListInterface } from 'src/models/fabList.model';
import { UserObjInterface } from 'src/models/userObj.model';

@Injectable()
export class NameService {


  private _UserObj = {};
  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) { }






  registerNewUser() {

    this.afAuth.auth.createUserWithEmailAndPassword('dsds', 1212).then((res) => {

    })
  }

get NewUserObj(): UserObjInterface {
    return {
      username: ' ' as string,
      password: ' ' as any,
      uuid: ' ' as string,
      nomeCompleto: ' ' as string,
      dataNascimento: ' ' as any,
      cargo: ' ' as string,
      isAdm: false as boolean
    }
}

}

