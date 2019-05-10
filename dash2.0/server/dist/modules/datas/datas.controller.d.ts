import { DatasService } from './datas.service';
export declare class DatasController {
    private dataSrv;
    constructor(dataSrv: DatasService);
    tratarFeriado(data: string): Promise<string>;
}
