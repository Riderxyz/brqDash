
import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../../services/fcm.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  badges: number = null;
  demandas$: AngularFireList<any[]>;
  finalizado = new Subject<any>();
  data: any = [];
  datateste = [];
  danger = true;
  warning = false;
  limites: any = {};
  source = interval(60000);

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public fcm: FcmProvider,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    public toast: ToastController,
    public loading: LoadingController,
    public firebaseSrv: Firebase) {
    this.teste()
    this.limites.warning = 600;
    this.limites.danger = 360;
    this.limites.crazy = 120;

    this.fcm.showBadgesNumber.asObservable()
      .subscribe((numero) => {
        this.logBadges();
      })



    this.af.list('brq-sla/ONS').valueChanges().subscribe((itemSnap) => {
      this.data = [];
      itemSnap.forEach((element: any) => {
        element.id = element.tfs.split('-')[1];
        /*   if (element.status === 'Em estimativa') {
            element.status = 'Estimativa';
          } else {
            if (element.status === 'Em desenvolvimento') {
              element.status = 'Desenv';
            }
          } */
        const arrayHora = element.data.split(':');
        element.dataHora = arrayHora[0].substring(1, 3) + 'hs'
        element.dataMinuto = arrayHora[1] + 'mins'
        this.data.push(element);
      });

    });
  }
  showDescricao(desc) {
    console.log(desc)
    this.alertCtrl.create({
      title: desc
    }).present()
  }

  ionViewDidEnter() {

  }

  teste() {
    console.log('WTF?');
    const res = this.fcm.saveDevideId();
    console.log(res);
  }

  startPush() {
    if (this.fcm.checkPlatform) {
      this.fcm.setBadge(5).then((res) => {
        console.log('Res de badge', res);
      }).catch((err) => {
        console.log(err);
      })
      this.fcm.showMeBadge().then((res: any) => {
        console.log('Res de badge', res);
        this.badges = res;
      })
      this.fcm.getToken();
    }


  }

  logBadges() {
    /* this.fcm.setBadge(100).then() */
    this.fcm.showMeBadge().then((res: any) => {
      console.log('Res de badge', res);
      this.badges = res;
    })

  }
  deleteBadges() {
    this.fcm.cleanBadge().then((res) => {
      console.log('Resultado da linha 47', res);
      this.logBadges()

    })
  }

  setstyle(params) {
    let retorno = '';
    const minutos = this.hourToMinute(params.data);
    if ((minutos >= this.limites.danger) && (minutos <= this.limites.warning)) {
      retorno = 'warning';
    } else {
      if ((minutos >= this.limites.crazy) && (minutos <= this.limites.danger)) {
        retorno = 'danger';
      } else {
        if (minutos <= this.limites.crazy) {
          retorno = 'crazy';
        } else {
          retorno = 'normal';
        }
      }
    }
    return retorno;
  }
  hourToMinute(hh: string): number {
    const arrayHora = hh.split(':');
    return (Number(arrayHora[0]) * 60) + Number(arrayHora[1]);
  }



}



