import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CentralRxJsService } from './centralRxjs.service';
@Injectable()
export class ToastService {

    constructor(
        private toastrService: NbToastrService,
        private centralRxjs: CentralRxJsService
    ) { }


    sendErrorToast(toastObj: { title: string; subtitle: string; }) {
        this.toastrService.danger(
            toastObj.subtitle,
            toastObj.title,
            {
                destroyByClick: true,
                icon: 'fas fa-times',
            }

        )
    }

    sendSucessToast(toastObj: { title: string; subtitle: string; }) {
        this.toastrService.success(
            toastObj.subtitle,
            toastObj.title,
            {
                destroyByClick: true,
                icon: 'fas fa-check',
            }

        )
    }

}
