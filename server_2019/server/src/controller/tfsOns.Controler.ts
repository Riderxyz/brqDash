import { Controller, Get, Res } from '@nestjs/common';
import { TfsService } from '../service/tfs/tfs.service';

@Controller('tfs')
export class TFSController {
    workitens = [];
    constructor(public tfsSrv: TfsService) {

    }

    @Get()
    findAll(@Res() res) {
        return this.tfsSrv.recuperarListaWorkItens()
            .subscribe(async (data: any) => {
                await this.getDadosWorkItems(data.workItems);
                console.log('WORKITEMS', this.workitens.length);

                res.status(200).send(this.workitens);
            });
    }

    async getDadosWorkItems(dados) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < dados.length; i++) {
            const element = dados[i];
            await this.tfsSrv.recuperarWorkItem(element.url)
                .then(w => {
                    this.workitens.push(w.data);
                    //    console.log('w', this.workitens.length);
                })
                .catch(error => console.log('error ', error));
        }

        // }
        // dados.forEach(async element => {
        //     await this.tfsSrv.recuperarWorkItem(element.url)
        //         .then(w => {
        //             this.workitens.push(w);
        //             console.log('w', this.workitens.length);
        //         })
        //         .catch(error => console.log('error ', error));
        // });

    }

}
