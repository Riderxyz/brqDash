import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FcmProvider {

  showBadgesNumber = new Subject<any>();
SaveTokenToFirebase = new Subject<any>();
  Envio: string
  DeviceId = {
    FromFirebase: [] ,
    Local: ''
  };
  constructor(
    public firebaseSrv: Firebase,
    private alertCtrl: AlertController,
    private platform: Platform,
    private db: AngularFireDatabase) {
    this.Envio = 'DeviceId'

    this.db.list(this.Envio).valueChanges().subscribe((tokens) => {
      console.log('linha 20 de serviço do fcm', tokens);
      this.DeviceId.FromFirebase = tokens
      this.firebaseSrv.getToken().then((token) => {
        this.DeviceId.Local = token;
        console.log('O q temos aqui? linha 27?', this.DeviceId);
        // this.SaveTokenToFirebase.next()
      })
      //this.DeviceId.Local = this.getToken();
    })
  }

  async getToken() {
    if (this.checkPlatform) {
      this.DeviceId.Local = await this.firebaseSrv.getToken()
      console.log('O q temos aqui? linha 23?', this.DeviceId);
      return await this.firebaseSrv.getToken()
    }
  }

  saveDevideId() {
    if (this.checkPlatform) {
      console.log('O q temos aqui? afinal? linha 42', this.DeviceId);
      this.DeviceId.FromFirebase.push(this.DeviceId.Local)
      const payload = this.DeviceId.FromFirebase
      this.db.object(this.Envio).set(payload).then((res) => {
        console.log('Acho q foi', res);
      }).catch((err) => {
        console.log('Deu ruim', err);

      })
      /* alert(payload) */
      //const inclusao = await this.db.object(this.Envio).set(payload)
      //console.log(inclusao);

      /*
             .then((res) => {
               console.log('O q se sucedeu? Funcionou?', res);
             }).catch((err) => {
               console.log('Deu ruim', err);
             }) */
    } else {
      console.log('N esta em um celular');

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
