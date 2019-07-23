import { DemandaDashboardModel } from '../models/demandaDashboard.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, filter, uniq, orderBy } from 'lodash';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { config } from './config';
import { FabListInterface } from 'src/models/fabList.model';

@Injectable()
export class GetDataService {

  private _DataJson: DemandaDashboardModel[] = [];
  private _DataJSalva: DemandaDashboardModel[] = [];
  private _localRequisitado = environment.NomeDashBoard;
  public ControleRemoto$ = new Subject<any>();
  constructor(public db: AngularFireDatabase) { }

  get ListarItems() {
    return this.db.list('brq-sla/ONS').valueChanges();
  }

  get ListarGerenciamento() {
    return this.db.list('brq-sla/gerenciamentoDiario').valueChanges();
  }

  filtroEsteira(esteiras) {
    const result = [];
    esteiras.forEach(esteira => {
      filter(this.DataJSalva, { 'esteira': esteira.name }).forEach(x => {
        result.push(x);
      });
    });
    console.log(result);
    this.DataJson = orderBy(result, ['data', 'esteira']);
    // filter(this.DataJson,{'esteira': esteira});
    return this.DataJson;
  }
  listaEsteiras() {
    return map(uniq(map(this.DataJson, 'esteira')), (item, index) => {
      return { label: item, value: { id: index, name: item } };
    });
  }

  public set DataJson(value: DemandaDashboardModel[]) {

    this._DataJson = value;
  }

  public get DataJson(): DemandaDashboardModel[] {

    return this._DataJson;
  }

  public set DataJSalva(value: DemandaDashboardModel[]) {

    this._DataJSalva = value;
  }

  public get DataJSalva(): DemandaDashboardModel[] {

    return this._DataJSalva;
  }

  public get randomEffect() {
    const effArr = config.animateCssArr;
    const random = effArr[Math.floor(Math.random() * effArr.length)];
    return random;
  }


  public get FabButtonList() {
    const arrFab: FabListInterface[] = [
      {
      cor: 'info',
      icon: 'fa fa-search',
      comando: config.fabCommand.FiltrarGrid,
      tooltip: 'Buscar'
    },
    {
      cor: 'warning',
      icon: 'fas fa-clock',
      comando: config.fabCommand.GoToDash,
      tooltip: 'DashBoard'
    },
    {
      cor: 'success',
      icon: 'fas fa-table',
      comando: config.fabCommand.GoToGD,
      tooltip: 'Gerenciamento Diario'
    },
    {
      cor: 'danger',
      icon: 'fas fa-user',
      comando: config.fabCommand.GoToUser,
      tooltip: 'Log in'
    }

    ]
    return arrFab;
  }

}
