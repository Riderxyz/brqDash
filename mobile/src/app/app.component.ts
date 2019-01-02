import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Firebase } from '@ionic-native/firebase';
import { tap } from 'rxjs/operators';
import { FcmProvider } from '../services/fcm.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public firebase: Firebase,
    public fcm: FcmProvider) {
    platform.ready().then(() => {
      if (fcm.checkPlatform) {
        this.fcm.listenToNotifications().pipe(
          tap((msg) => {
            const toast = alertCtrl.create({
              title: msg.title,
              subTitle: msg.body
            });
            toast.present();
          })
        ).subscribe((push) => {
          console.log('O q tenho aqui na linha 33 do appComponent?', push);
          if (push.callPushBadge === 'HomePage') {
            console.log('Funciona! Vindo da linha 35');
            this.fcm.setBadge(50)
          }
        });
      } else {
        // this.alertCtrl.create({
        //   title: 'N ira receber Push'
        // }).present()
      }


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

