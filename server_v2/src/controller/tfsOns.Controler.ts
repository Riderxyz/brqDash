import { Controller, Get } from '@nestjs/common';
import { TfsService } from '../service/tfs/tfs.service';

@Controller('tfs')
export class TFSController {
    constructor(public tfsSrv: TfsService) {

    }

    @Get()
    findAll() {
        let x;
        return this.tfsSrv.recuperarListaWorkItens()
            .subscribe((data: string) => {
                // console.log(data)
                //
                return data; // x = JSON.stringify(data)
            })

    }

}