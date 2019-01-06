import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import { DefaultModalComponent } from './components/modals/default-modal.component';
import { SysInfoPipe, TranslatePipe, LocalDatePipe } from './pipes';
import { ErrorHelper, HumanizerHelper } from './helpers';
import { TablePreferencesComponent, EPlayersRendererComponent } from './components/tables';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
  ],
  declarations: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
    TablePreferencesComponent,
    EPlayersRendererComponent,
    DefaultModalComponent,
  ],
  entryComponents: [
    EPlayersRendererComponent,
    DefaultModalComponent,
    TablePreferencesComponent,
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
    TablePreferencesComponent,
    EPlayersRendererComponent,
  ],
})
export class SharedModule { }
