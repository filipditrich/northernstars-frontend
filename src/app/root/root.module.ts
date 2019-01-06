import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { RootRouting } from './root.routing';
import { RootComponent } from './root.component';

@NgModule({
  imports: [
    RootRouting,
    ThemeModule,
  ],
  declarations: [
    RootComponent,
  ],
})
export class RootModule {
}
