import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, RoleGuard } from '../@core/guards/access.guard';
import { UserRoles } from '../@shared/models';
import { HomeComponent } from './home/home.component';

import { RootComponent } from './root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivateChild: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'system',
        loadChildren: 'app/root/system/system.module#SystemModule',
        canActivate: [ AuthGuard, RoleGuard ],
        data: { roles: [ UserRoles.Super ] },
      },
    ],
  },
  { path: 'auth',  loadChildren: 'app/root/auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRouting {
}
