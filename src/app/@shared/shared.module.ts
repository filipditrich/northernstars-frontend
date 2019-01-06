import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import { SysInfoPipe, TranslatePipe, LocalDatePipe } from './pipes';
import { ErrorHelper, HumanizerHelper } from './helpers';
import { TablePreferencesComponent, EPlayersRendererComponent } from './tables';

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
  ],
  entryComponents: [
    EPlayersRendererComponent,
  ],
  providers: [
    HumanizerHelper,
    ErrorHelper,
  ],
  exports: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
    TablePreferencesComponent,
    EPlayersRendererComponent,
  ],
})
export class SharedModule { }
