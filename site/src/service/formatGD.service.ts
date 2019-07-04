import { DemandaDashboardModel } from '../models/demandaDashboard.model';
import { Injectable } from '@angular/core';
import { GDInterface } from 'src/models/gd.model';

@Injectable()
export class FormatGDService {
  constructor() { }

  formatNome(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.nome + '</span>';
    return html;
  }
  formatProducaoMensal(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.prodMensal + '</span>';
    /* const html = `<nb-card>
    <nb-card-header>` + dados.dados.metas.prodMensal + `</nb-card-header>
    </nb-card>` */
    return html;
  }
  formatHoraPrevista(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.horasPrev + '</span>';
    return html;
  }
  formatHoraEntregues(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.horasEntregues + '</span>';
    return html;
  }
  formatMetaCumprida(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metas.metaCumprida + '</span>';
    return html;
  }
  formatSaldo(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.saldo + '</span>';
    return html;
  }
  formatSemana1(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana1.valor + '</span>';
    return html;
  }
  formatSemana2(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana2.valor + '</span>';
    return html;
  }
  formatSemana3(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana3.valor + '</span>';
    return html;
  }
  formatSemana4(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana4.valor + '</span>';
    return html;
  }
  formatSemana5(param: any) {
    const dados: GDInterface = param.data;
    const html = '<span class="colunasDoGD">' + dados.dados.metaSemanal.semana5.valor + '</span>';
    return html;
  }
}
