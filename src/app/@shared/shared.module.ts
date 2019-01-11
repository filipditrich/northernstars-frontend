import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTooltipModule } from '@nebular/theme';
import { SortablejsModule } from 'angular-sortablejs';
import { DefaultCreateModalComponent, DefaultEditModalComponent, DefaultModalComponent } from './components';
import { SysInfoPipe, TranslatePipe, LocalDatePipe } from './pipes';
import { ErrorHelper, HumanizerHelper } from './helpers';
import { TablePreferencesComponent, EPlayersRendererComponent } from './components/tables';
import { UsersService } from './services';

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
    DefaultEditModalComponent,
  ],
  entryComponents: [
    EPlayersRendererComponent,
    DefaultModalComponent,
    TablePreferencesComponent,
    DefaultCreateModalComponent,
    DefaultEditModalComponent,
  ],
  providers: [
    HumanizerHelper,
    ErrorHelper,
    UsersService,
  ],
  exports: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
    DefaultModalComponent,
    DefaultCreateModalComponent,
    DefaultEditModalComponent,
    TablePreferencesComponent,
    EPlayersRendererComponent,
  ],
})
export class SharedModule { }
