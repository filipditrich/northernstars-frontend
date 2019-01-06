import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
  {
    path: 'auth',
    loadChildren: 'app/root/auth/auth.module#AuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRouting {
}
