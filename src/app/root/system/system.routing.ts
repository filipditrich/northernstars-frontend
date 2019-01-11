import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { translate } from '../../@shared/helpers';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { SystemInfoComponent } from './info/system-info.component';

/**
 * @description System Routing
 */
const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  // { path: 'info', component: SystemInfoComponent, data: { title: translate('SYSTEM_INFO') } },
  { path: 'dictionary', component: DictionaryComponent, data: { title: translate('DICT_MGR') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRouting { }
