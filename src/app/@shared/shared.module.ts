import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysInfoPipe, TranslatePipe, LocalDatePipe } from './pipes';
import { ErrorHelper, HumanizerHelper } from './helpers';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
  ],
  providers: [
    HumanizerHelper,
    ErrorHelper,
  ],
  exports: [
    TranslatePipe,
    SysInfoPipe,
    LocalDatePipe,
  ],
})
export class SharedModule { }
