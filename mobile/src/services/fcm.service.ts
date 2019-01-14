import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FcmProvider {

  showBadgesNumber = new Subject<any>()
  Envio: string
  DeviceId: string;
  constructor(
    public firebaseSrv: Firebase,
    private alertCtrl: AlertController,
    private platform: Platform,
    private db: AngularFireDatabase) {
    this.Envio = 'deviceId'
    this.saveDevideId()
  }

  async getToken() {
    if (this.checkPlatform) {
      this.DeviceId = await this.firebaseSrv.getToken()
      console.log('O q temos aqui? Heub?', this.DeviceId);
    }
  }

  async saveDevideId() {
    if (this.checkPlatform) {
      console.log('O q temos aqui? afinal?', this.DeviceId);
      const payload = {
        Id: this.DeviceId
      }
      const inclusao = await this.db.object(this.Envio).set(payload)
      console.log(inclusao);

      /* 
             .then((res) => {
               console.log('O q se sucedeu? Funcionou?', res);
             }).catch((err) => {
               console.log('Deu ruim', err);
             }) */
    } else {
      // this.alertCtrl.create({
      //   title: 'N ira receber Push'
      // }).present()
    }
  }
  listenToNotifications() {
    return this.firebaseSrv.onNotificationOpen()
  }

  setBadge(qtd) {
    this.showBadgesNumber.next()
    return this.firebaseSrv.setBadgeNumber(qtd)
  }

  cleanBadge() {
    return this.firebaseSrv.setBadgeNumber(0)
  }
  showMeBadge() {
    return this.firebaseSrv.getBadgeNumber()
  }
  get checkPlatform() {
    return (this.platform.is('cordova'))
  }
}
