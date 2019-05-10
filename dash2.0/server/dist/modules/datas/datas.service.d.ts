import { isHoliday } from '@astrocoders/holidays-br';
export declare class DatasService {
    private _feriado;
    dataAtual: Date;
    constructor(_feriado: isHoliday);
    isWeekDay(data: string): boolean;
    Feriado(data: string): boolean;
    TratarFeriado(data: string): string;
    emHorarioTrabalho(data: string): boolean;
    proximoHorarioTrab(data: string, hh: string): Date;
    private proximoDiaUtil;
}
