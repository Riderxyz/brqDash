import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { DatasService } from './datas.service';

@Controller('datas')
export class DatasController {
    constructor(private dataSrv: DatasService) {
    }

    @Get(':data')
    async ehFeriado(@Param('data') data: string) {
        return await this.dataSrv.ehFeriado(data);//  .TratarFeriado(data);
    }

    @Get('tratarFeriado/:data')
    async tratarFeriado(@Param('data') data: string) {
        return await this.dataSrv.TratarFeriado(data);//  .TratarFeriado(data);
    }

    @Get('proximodiautil/:data')
    async tratarproximoDiaUtil(@Param('data') data: string) {
        await this.dataSrv.proximoDiaUtil(data);//  .TratarFeriado(data);
        return this.dataSrv.dataAtual;
    }

    @Get('proximoLimite/:data')
    async  tratarproximoLimite(@Param('data') data: string) {
        return await this.dataSrv.proximoLimiteHorario(data);//  .TratarFeriado(data);
        //   return this.dataSrv.dataAtual;
    }


}
