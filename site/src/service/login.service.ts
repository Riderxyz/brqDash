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
import { CentralRxJsService } from './centralRxjs.service';
import * as moment from 'moment'
@Injectable()
export class LoginService {



  private _UserObj: UserObjInterface;
  Envio: string;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private toastrService: NbToastrService,
    private centralRxjs: CentralRxJsService) {
    const refreshToken = localStorage.getItem('sdd')
    console.log(refreshToken);
    if (refreshToken !== null) {
      this.afAuth.auth.signInWithCustomToken(refreshToken)
        .then((res) => {
          localStorage.setItem(config.localStorageKeys.userRefreshToken, res.user.refreshToken);
          this.getUserDataFromLocal(res.user.displayName, res.user.uid)
        }).catch((err) => {
          console.log(err);

        })
    } else {
      console.log('linha 32 de loginservice');

    }
  }


  registerNewUser(UserObj: UserObjInterface) {
    console.log('antes da conversão', UserObj);

    const dataEmUnix = UserObj.dataNascimento.format('x');
    UserObj.dataNascimento = Number(dataEmUnix);
    console.log('dentro do loginService', dataEmUnix);
     this.afAuth.auth.createUserWithEmailAndPassword(UserObj.email, UserObj.password).then((res) => {
      console.log(res.user.uid);
      res.user.updateProfile({
        displayName: UserObj.nomeCompleto
      }).then(() => { })
      UserObj.uuid = res.user.uid;
      localStorage.setItem(config.localStorageKeys.userRefreshToken, res.user.refreshToken);
      res.user.refreshToken;

      this.saveNewUserToDB(UserObj);
    })
      .catch((err) => {
        console.log(err);
      }) 
  }

  saveNewUserToDB(UserObj: UserObjInterface) {
    this.Envio = 'Usuarios/' + UserObj.nomeCompleto + ' - ' + UserObj.uuid;
    this.db.object(this.Envio).set(UserObj)
      .then((res) => {
        this.toastrService.show(
          'This is super toast message',
          `This is toast number: Who Cares?`,
          {
            destroyByClick: true,
            icon: 'fas fa-check',
          });
        const comando = config.rxjsCentralKeys.onRegisterUserSucess;
        this.centralRxjs.sendData = comando;
      }).catch((err) => {

        console.log(err);

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
      exteira: null as string,
      tokenForPush: []
    }
  }

  async getUserDataFromLocal(displayName: string, uuid: string) {
    this.Envio = 'Usuarios/' + displayName + ' - ' + uuid;
    const dbUser: any = await this.db.object(this.Envio).valueChanges().toPromise();
    this.UserObj = dbUser;

  }
  get UserObj() {
    return this._UserObj;
  }

  set UserObj(value: UserObjInterface) {
    this._UserObj = value;
  }

}

