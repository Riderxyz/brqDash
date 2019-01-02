import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FcmProvider {

  showBadgesNumber = new Subject<any>()
  constructor(
    public firebaseSrv: Firebase,
    private alertCtrl: AlertController,
    private platform: Platform) { }

  async getToken() {
    let token;
    if (this.platform.is('cordova')) {
      token = await this.firebaseSrv.getToken()
      console.log('O q temos aqui? Heub?', token);
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
