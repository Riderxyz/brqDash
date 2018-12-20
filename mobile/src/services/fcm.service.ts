import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FcmProvider {

  showBadgesNumber = new Subject<any>()
  constructor(
    public firebaseSrv: Firebase,
    private platform: Platform) { }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebaseSrv.getToken()
    }
    console.log('O q temos aqui? Heub?', token);
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
  showMeBadge(){
   return this.firebaseSrv.getBadgeNumber()
  }
}
