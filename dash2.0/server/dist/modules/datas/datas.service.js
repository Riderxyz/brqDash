"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const mom = require("moment");
const holidays_br_1 = require("@astrocoders/holidays-br");
const config_service_1 = require("../../utils/config/config.service");
let DatasService = class DatasService {
    constructor(_feriado) {
        this._feriado = _feriado;
    }
    isWeekDay(data) {
        this.dataAtual = mom(data).toDate();
        return ((mom(this.dataAtual).isoWeekday() > 1) && ((mom(this.dataAtual).isoWeekday() < 7)));
    }
    Feriado(data) {
        let ret = false;
        try {
            ret = this._feriado(data);
        }
        catch (error) {
            ret = false;
        }
        return ret;
    }
    TratarFeriado(data) {
        let dt = '';
        if (this.Feriado(data)) {
            dt = mom(data).add(1, 'days').toISOString();
            if (this.Feriado(dt)) {
                this.TratarFeriado(dt);
            }
        }
        return dt;
    }
    emHorarioTrabalho(data) {
        let ret = false;
        if ((!this.Feriado) && (!this.isWeekDay(data))) {
            const horaIniBase = mom();
            const jornadaInicio = mom(config_service_1.config.Jornada.JORNADA_INICIO);
            const jornadaFim = mom(config_service_1.config.Jornada.JORNADA_FIM);
            const jornadaAlmocoInicio = mom(config_service_1.config.Jornada.JORNADA_INICIO_ALMOCO);
            const jornadaAlmocoFim = mom(config_service_1.config.Jornada.JORNADA_FIM_ALMOCO);
            const curTime = mom(data, 'hh:mm:ss');
            ret = ((curTime >= jornadaInicio) &&
                (curTime <= jornadaFim) &&
                (curTime <= jornadaAlmocoInicio) &&
                (curTime >= jornadaAlmocoFim));
        }
        else {
            ret = false;
        }
        return ret;
    }
    proximoHorarioTrab(data, hh) {
        return new Date();
    }
    proximoDiaUtil(data) {
        this.dataAtual = mom(data).toDate();
        while (this.Feriado(this.dataAtual.toISOString())) {
            mom(this.dataAtual).add(1, 'd');
        }
        if (mom(this.dataAtual).day() === 6) {
            mom(this.dataAtual).add(2, 'd');
        }
        else if (mom(this.dataAtual).day() === 0) {
            mom(this.dataAtual).add(1, 'd');
        }
        while (this.Feriado(this.dataAtual.toISOString())) {
            mom(this.dataAtual).add(1, 'd');
        }
        return this.dataAtual;
    }
};
DatasService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof holidays_br_1.isHoliday !== "undefined" && holidays_br_1.isHoliday) === "function" ? _a : Object])
], DatasService);
exports.DatasService = DatasService;
//# sourceMappingURL=datas.service.js.map