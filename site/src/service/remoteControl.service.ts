import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GetDataService } from './getData.service';

@Injectable()
export class RemoteControlService {
  public controleRemoto = new Subject<any>();
  private _localRequisitado = environment.NomeDashBoard;

  constructor(
    public db: AngularFireDatabase,
    public dataSrv: GetDataService
  ) {
    this.db.object('/dashBoardAtivo/' + this._localRequisitado).valueChanges()
      .subscribe((res: any) => {
        console.log(`Controle`, res);
        const esteirasFiltradas = [];
        res.esteirasParaExibicao.forEach(element => {
          esteirasFiltradas.push(element.value);
        });
        this.controleRemoto.next(esteirasFiltradas);
      });
  }



  async DashBoardAtivo() {
    this.db.object('/dashBoardAtivo/' + this._localRequisitado).set({
      dash: 'Desenvolvimento',
      status: 'online',
      esteirasParaExibicao: this.dataSrv.listaEsteiras(),
      id: Math.random().toString(36).substr(2, 9)
    });
  }

}
