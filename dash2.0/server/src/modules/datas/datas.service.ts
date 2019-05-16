import { Injectable } from '@nestjs/common';
import * as mom from 'moment-timezone';
import { config } from '../../utils/config/config.service';
import { datasFeriados } from './datas-feriados';
import * as lh from 'lodash';
import { monitorEventLoopDelay } from 'perf_hooks';
import { switchCase } from '@babel/types';

@Injectable()
export class DatasService {
    dataAtual: Date;

    constructor() {
        //    mom.lang('pt-br');
        console.log(mom.tz());

        mom.tz.setDefault('America/Sao_Paulo');
        console.log(mom.tz());
    }

    /**
     * ehFeriado
 data: string    */
    public ehFeriado(data: string) {
        const list: [] = lh.filter(datasFeriados.FERIADOS, item => item.data == data);
        return list.length > 0;
    }

    public ehDiaSemana(data: string): boolean {
        this.dataAtual = mom(data).toDate();
        return ((mom(this.dataAtual).isoWeekday() > 1) && ((mom(this.dataAtual).isoWeekday() < 7)));
    }

    ehFinalDeSemana(data: string): boolean {
        this.dataAtual = mom(data).toDate();
        return ((mom(this.dataAtual).isoWeekday() >= 6) && ((mom(this.dataAtual).isoWeekday() <= 7)));
    }

    public async TratarFeriado(data: string) {
        let dt = data;
        if (await this.ehFeriado(data)) {
            dt = mom(data).add(1, 'days').toISOString();
            if (await this.ehFeriado(dt)) {
                dt = await this.TratarFeriado(dt);
            }
        }
        return dt;
    }

    public async TratarFinalDeSemana(data: string) {
        let dt = data;
        if (await this.ehFinalDeSemana(data)) {
            dt = mom(data).add(1, 'days').toISOString();
            if (await this.ehFinalDeSemana(dt)) {
                dt = await this.TratarFinalDeSemana(dt);
            }
        }
        return dt;
    }

    public async proximoDiaUtil(data) {
        data = await this.TratarFinalDeSemana(data);
        data = await this.TratarFeriado(data);
        this.dataAtual = mom(data).toDate();
    }

    public proximoLimiteHorario(data: string): string {
        const hora: number = parseInt(data.substr(11, 2));
        const zone = mom.tz.zone('America/Fortaleza');
        let proxima = '';
        switch (true) {
            case (hora < 9):
                proxima = config.Jornada.JORNADA_INICIO;
                break;
            case ((hora >= 9) && (hora < 12)):
                proxima = config.Jornada.JORNADA_INICIO_ALMOCO;
                break;
            case (hora >= 12 && hora < 13):
                proxima = config.Jornada.JORNADA_FIM_ALMOCO;
                break;
            case (hora >= 13 && hora < 18):
                proxima = config.Jornada.JORNADA_FIM;
                break;
            case (hora >= 18):
                data = this.addDays(this.now(data), 1).toISOString();
                proxima = config.Jornada.JORNADA_INICIO;
                break;
            default:
                break;
        }
        return data.substring(0, 10) + ' ' + proxima;
    }

    getTimeInterval(startTime, endTime, lunchTime) {
        const start = mom(startTime, 'HH:mm');
        let end = mom(endTime, 'HH:mm');
        let minutes = end.diff(start, 'minutes');
        let interval = mom().hour(0).minute(minutes);
        interval.subtract(lunchTime, 'minutes');
        return interval.format('HH:mm');
    }

    addDays(date: Date, days: number) {
        var result = this.now(date.toISOString());
        result.setDate(result.getDate() + days);
        return result;
    }

    public async calcularSla(horas: string) {
        const consumido = 0;
        let saldo = this.horasParaMinutos(horas);
        let dtPartida = this.now();
        console.log('dt partida inicial ', dtPartida);
        if (!this.horarioComercial(this.now().toISOString())) {
            dtPartida = this.now(this.proximoLimiteHorario(dtPartida.toISOString()));
        }

        console.log('dt partida inicial ', dtPartida);

        console.log('dt partida tratada', this.proximoLimiteHorario(dtPartida.toISOString()))
        console.log('hoario comercial, ', dtPartida, this.horarioComercial(dtPartida.toISOString()));


        let rastreio = [];
        let dtChegada = this.now(mom(this.proximoLimiteHorario(dtPartida.toISOString())));
        let difMinutos = dtPartida.getTime() - dtChegada.getTime();
        console.log(dtPartida, dtChegada);

        let minutos = Math.floor((difMinutos) / (1000) / 60);
        console.log('minutos ', minutos);

        saldo -= Math.abs(minutos);
        rastreio.push({ partida: dtPartida, saldo1: saldo, chegada: dtChegada });
        while ((saldo > 0)) {
            dtPartida = this.now(this.proximoLimiteHorario(dtChegada.toISOString()));
            dtChegada = this.now(this.proximoLimiteHorario(dtPartida.toISOString()));
            const difMinutos = dtPartida.getTime() - dtChegada.getTime();
            const minutos = Math.floor((difMinutos) / (1000) / 60);
            saldo -= Math.abs(minutos);
            if (saldo < 0) {
                console.log('dt chegada ', dtChegada);
                console.log(mom(dtChegada).subtract(Math.abs(saldo), 'minutes').toDate());
                dtChegada = mom(dtChegada).subtract(Math.abs(saldo), 'minutes').toDate();
                console.log('chegada tratada ', dtChegada);

            }
            rastreio.push({ partida: dtPartida, saldo1: saldo, chegada: dtChegada });
        }
        console.log('ukltima data ', rastreio[rastreio.length - 1].chegada);
        let d = rastreio[rastreio.length - 1].chegada;
        let d1 = d;
        console.log('ultima data ', d.setMinutes(d.getMinutes() - Math.abs(saldo)));
        d1.setMinutes(d1.getMinutes() - Math.abs(saldo));
        console.log('d1 ', d1);

        return rastreio;
    }

    private horasParaMinutos(hora: string): number {
        if (hora === undefined) {
            return 0;
        }
        const posicao = hora.indexOf(':');
        const hh = parseInt(hora.substring(0, posicao));
        const min = parseInt(hora.substring(posicao + 1));
        console.log(hh, min, (hh * 60) + min);

        return ((hh * 60) + min);
    }


    now(hh?: string): Date {
        const zone = mom.tz.zone('America/Fortaleza');
        const z1 = zone.parse(Date.UTC(2012, 2, 11, 1, 59));
        let ret;
        if (hh === undefined) {
            ret = mom().subtract(z1, 'minutes').toDate();
        } else {
            ret = mom(hh).subtract(z1, 'minutes').toDate();
        }
        return ret
    }

    horarioComercial(data: string): boolean {
        const hora = this.hora(data);
        return !((hora < 9) || (hora >= 18) || (hora == 12))
    }

    hora(data: string): number {
        return parseInt(data.substr(data.indexOf('T') + 1, 3));
    }
}
