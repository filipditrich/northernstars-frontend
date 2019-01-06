import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { translate } from '../../@shared/helpers';
import { SystemInfoComponent } from './info/system-info.component';

/**
 * @description System Routing
 */
const routes: Routes = [
  {
    path: '',
    component: SystemInfoComponent,
    data: { title: translate('SYSTEM_INFO') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRouting { }
