import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';
import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    SharedModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
