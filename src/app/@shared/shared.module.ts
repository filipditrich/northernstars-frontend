import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbTooltipModule} from '@nebular/theme';
import { SortablejsModule } from 'angular-sortablejs';
import {DefaultCreateModalComponent} from './components/modals/default-create-modal.component';
import { DefaultModalComponent } from './components/modals/default-modal.component';
import { SysInfoPipe, TranslatePipe, LocalDatePipe } from './pipes';
import { ErrorHelper, HumanizerHelper } from './helpers';
import { TablePreferencesComponent, EPlayersRendererComponent } from './components/tables';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    NbTooltipModule,
  ],
  declarations: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
    TablePreferencesComponent,
    EPlayersRendererComponent,
    DefaultModalComponent,
    DefaultCreateModalComponent,
  ],
  entryComponents: [
    EPlayersRendererComponent,
    DefaultModalComponent,
    TablePreferencesComponent,
    DefaultCreateModalComponent,
  ],
  providers: [
    HumanizerHelper,
    ErrorHelper,
  ],
  exports: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
    DefaultModalComponent,
    DefaultCreateModalComponent,
    TablePreferencesComponent,
    EPlayersRendererComponent,
  ],
})
export class SharedModule { }
