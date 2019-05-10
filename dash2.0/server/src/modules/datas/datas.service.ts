import { Injectable } from '@nestjs/common';
import * as mom from 'moment';
import { config } from '../../utils/config/config.service';
import { datasFeriados } from './datas-feriados';
import * as lh from 'lodash';
import { monitorEventLoopDelay } from 'perf_hooks';
import { switchCase } from '@babel/types';

@Injectable()
export class DatasService {
    dataAtual: Date;

    constructor() { }

    /**
     * ehFeriado
 data: string    */
    public ehFeriado(data: string) {
        let list: [] = lh.filter(datasFeriados.FERIADOS, item => item.data == data);
        return list.length > 0;
    }

    public ehDiaSemana(data: string): boolean {
        this.dataAtual = mom(data).toDate();
        return ((mom(this.dataAtual).isoWeekday() > 1) && ((mom(this.dataAtual).isoWeekday() < 7)))
    }

    ehFinalDeSemana(data: string): boolean {
        this.dataAtual = mom(data).toDate();
        return ((mom(this.dataAtual).isoWeekday() >= 6) && ((mom(this.dataAtual).isoWeekday() <= 7)))
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

    public proximoLimiteHorario(data): string {
        console.log('data time ', mom(data).format('HH'));
        let hora: number = parseInt(mom(data).format('HH'))
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
                data = mom(data).add(1, 'days').toISOString();
                proxima = config.Jornada.JORNADA_INICIO
                break;
            default:
                break;
        }
        //        console.log(differenceTravel, minutos);


        // console.log(dtPartida, dtChegada);

        // console.log('Difference is ', dtChegada.diff(dtPartida), 'minutes');

        // let x = data.substring(0, 10) + 'T' + proxima;
        // var start = mom(mom().toDate(), "HH:mm");
        // var end = mom(x, "HH:mm");
        // var minutes = end.diff(start, 'minutes');
        // var interval = mom().hour(0).minute(minutes);


        // var date1 = new Date(dtPartida.slice(0, 4), dtPartida.slice(4, 6), dtPartida.slice(6, 8), dtPartida.slice(9, 11), dtPartida.slice(12, 14)),
        //     date2 = new Date(dtChegada.slice(0, 4), dtChegada.slice(4, 6), dtChegada.slice(6, 8), dtChegada.slice(9, 11), dtChegada.slice(12, 14));

        // var diffMs = (date2 - date1);
        // var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        // var diff = diffHrs + 'h ' + diffMins + 'm';
        //  console.log('minutos', (dtChegada - dtPartida));


        // let x = data.substring(0, 10) + 'T' + proxima;
        // var start = mom(mom().toDate(), "HH:mm").toDate();
        // var end = mom(x, "HH:mm").toDate();
        // var minutes = end.diff(start, 'minutes');
        // var interval = mom().hour(0).minute(minutes);
        // console.log('data ', x);
        // console.log('end', end);
        // console.log('start', start);
        // console.log('minutos', minutes);


        // console.log(interval);

        //      interval.subtract(lunchTime, 'minutes');



        return data.substring(0, 10) + ' ' + proxima;
    }

    getTimeInterval(startTime, endTime, lunchTime) {
        var start = mom(startTime, "HH:mm");
        var end = mom(endTime, "HH:mm");
        var minutes = end.diff(start, 'minutes');
        var interval = mom().hour(0).minute(minutes);
        interval.subtract(lunchTime, 'minutes');
        return interval.format("HH:mm");
    }

    public async calcularSla(data: string, horas: number) {
        //let saldo = horas;
        let consumido = 0;
        let rastreio = [];
        let datalimite = this.proximoLimiteHorario(data);
        let saldo = horas;
        var dtPartida = mom(data).toDate();
        var dtChegada = mom(this.proximoLimiteHorario(data)).toDate();
        console.log('partida inicio', dtPartida);
        console.log('partida chegada', dtChegada);

        while (saldo > 0) {
            var differenceTravel = dtPartida.getTime() - dtChegada.getTime();
            var minutos = Math.floor((differenceTravel) / (1000) / 60);
            saldo -= minutos;
            dtPartida = mom(this.proximoLimiteHorario(dtChegada)).toDate();
            dtChegada = mom(this.proximoLimiteHorario(dtPartida)).toDate();

            console.log('partida dentro inicio', dtPartida);
            console.log('partida dentro chegada', dtChegada);
        }


    }
    // emHorarioTrabalho(d ata: string): boolean {
    //     let ret = false;
    //     if ((!this.ehFeriado) && (!this.isWeekDay(data))) {
    //         const horaIniBase = mom()

    //         const jornadaInicio = mom(config.Jornada.JORNADA_INICIO);
    //         const jornadaFim = mom(config.Jornada.JORNADA_FIM);
    //         const jornadaAlmocoInicio = mom(config.Jornada.JORNADA_INICIO_ALMOCO);
    //         const jornadaAlmocoFim = mom(config.Jornada.JORNADA_FIM_ALMOCO);
    //         const curTime = mom(data, 'hh:mm:ss');
    //         ret = (
    //             (curTime >= jornadaInicio) &&
    //             (curTime <= jornadaFim) &&
    //             (curTime <= jornadaAlmocoInicio) &&
    //             (curTime >= jornadaAlmocoFim)
    //         )
    //     } else {
    //         ret = false;
    //     }
    //     return ret;
    // }

    // proximoHorarioTrab(data: string, hh: string): Date {
    //     return new Date();
    //     /*
    //     se soma inAlmoco ou foraHorario
    //             r = calcular(restante)


    //     se em halmoço
    //             montar data fim almoço
    //     se fora horario
    //             montar data inicioAlmoço
    //     se soma inAlmoco ou foraHorario
    //             r = calcular(restante)



    //     */



    // }

    // private proximoDiaUtil(data: string) {
    //     this.dataAtual = mom(data).toDate();
    //     while (this.ehFeriado(this.dataAtual.toISOString())) {
    //         mom(this.dataAtual).add(1, 'd')
    //     }
    //     if (mom(this.dataAtual).day() === 6) {
    //         mom(this.dataAtual).add(2, 'd')
    //     } else if (mom(this.dataAtual).day() === 0) {
    //         mom(this.dataAtual).add(1, 'd');
    //     }
    //     while (this.ehFeriado(this.dataAtual.toISOString())) {
    //         mom(this.dataAtual).add(1, 'd')
    //     }
    //     return this.dataAtual;

    // }
}
