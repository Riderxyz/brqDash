import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbSelectModule,
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
    NbDialogModule,
    NbListModule,
    NbTooltipModule,
    NbDatepickerModule,
} from '@nebular/theme';


const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
      {
        name: 'cosmic',
      },
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
    ...NbDialogModule.forRoot().providers,
    ...NbWindowModule.forRoot().providers,
    ...NbDatepickerModule.forRoot().providers,
    ...NbToastrModule.forRoot().providers,
  ];
  


@NgModule({
    imports: [
        CommonModule,
        NbActionsModule,
        NbCardModule,
        NbLayoutModule,
        NbMenuModule,
        NbSelectModule,
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
        NbDialogModule,
        NbListModule,
        NbTooltipModule,
        NbDatepickerModule
    ],
    declarations: [],
    exports: [
        NbActionsModule,
        NbCardModule,
        NbLayoutModule,
        NbMenuModule,
        NbSelectModule,
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
        NbDialogModule,
        NbListModule,
        NbTooltipModule,
        NbDatepickerModule
    ]
})

export class NebularModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: NebularModule,
          providers: [...NB_THEME_PROVIDERS],
        } as ModuleWithProviders;
      }
}