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
import * as firebase from 'firebase/app';
import { NbToastrService } from '@nebular/theme';
@Injectable()
export class LoginService {


  private _UserObj = {};
  constructor(public db: AngularFireDatabase,  public afAuth: AngularFireAuth, private toastrService: NbToastrService) { }


  registerNewUser(UserObj: UserObjInterface) {

    this.afAuth.auth.createUserWithEmailAndPassword( UserObj.email, UserObj.password).then((res) => {
      console.log(res);

      this.toastrService.show(
        'This is super toast message',
        `This is toast number: Who Cares?`,
        { destroyByClick: true,
        icon:'fas fa-check' });
    })

  }

get NewUserObj(): UserObjInterface {
    return {
      email: null as string,
      password: null as any,
      uuid: null as string,
      nomeCompleto: null as string,
      dataNascimento: null as any,
      cargo: null as string,
      isAdm: false as boolean,
      exteira: null as string
    }
}

}

