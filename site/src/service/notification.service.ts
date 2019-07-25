import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from 'firebase';
@Injectable()
export class NotificationService {
    messaging = firebase.messaging()
    constructor(private afMessaging: AngularFireMessaging) { 
        this.afMessaging.messages
        .subscribe((message) => {
          console.log('linha 10 do serviço ',message);
        });

        this.afMessaging.requestPermission.subscribe((res) => {
            console.log('resultado do pedido: ', res)
          })
          this.afMessaging.requestToken
            .subscribe(
              (token) => { console.log('Permission granted! Save to the server!', token); },
              (error) => { console.error(error); },
            );
        }
        
        listenToMessages() {
            return this.afMessaging.messaging
        
        }
}

