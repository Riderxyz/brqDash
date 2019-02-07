import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class RemoteControlService {
  private _localRequisitado = environment.NomeDashBoard;
  
  constructor(public db: AngularFireDatabase) { }


  async controleRemoto() {
    this.db.object('/dashBoardAtivo/' + this._localRequisitado).valueChanges().subscribe((res) => {
      console.log(`Dafuck?`, res);
    });

  }

  async DashBoardAtivo() {
    this.db.object('/dashBoardAtivo/' + this._localRequisitado).set({
      dash: 'Desenvolvimento',
      status: '',
      id: Math.random().toString(36).substr(2, 9)
    });

  }

}
