import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarService,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbButtonModule,
    NbCalendarModule,
    NbAlertModule,
    NbCheckboxModule,
    NbAccordionModule,
    NbStepperModule,
    NbInputModule,
    NbToastrModule,
    NbWindowModule,
    NbDialogModule
} from '@nebular/theme';


@NgModule({
    imports: [
        CommonModule,
        NbActionsModule,
        NbCardModule,
        NbLayoutModule,
        NbMenuModule,
        NbRouteTabsetModule,
        NbSearchModule,
        NbSidebarModule,
        NbTabsetModule,
        NbThemeModule,
        NbUserModule,
        NbButtonModule,
        NbCalendarModule,
        NbAlertModule,
        NbCheckboxModule,
        NbAccordionModule,
        NbStepperModule,
        NbInputModule,
        NbToastrModule,
        NbWindowModule,
        NbDialogModule
    ],
    declarations: [],
    exports: [
        NbActionsModule,
        NbCardModule,
        NbLayoutModule,
        NbMenuModule,
        NbRouteTabsetModule,
        NbSearchModule,
        NbSidebarModule,
        NbTabsetModule,
        NbThemeModule,
        NbUserModule,
        NbButtonModule,
        NbCalendarModule,
        NbAlertModule,
        NbCheckboxModule,
        NbAccordionModule,
        NbStepperModule,
        NbInputModule,
        NbToastrModule,
        NbWindowModule,
        NbDialogModule
    ]
})
export class NebularModule { }
