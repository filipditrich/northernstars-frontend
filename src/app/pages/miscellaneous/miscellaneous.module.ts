import { NgModule } from '@angular/core';
import { SharedModule } from '../../@shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule, routedComponents } from './miscellaneous-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
    MiscellaneousRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class MiscellaneousModule { }
