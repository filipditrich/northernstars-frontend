import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, PreventLogged } from '../../@core/guards';
import { translate } from '../../@shared/helpers';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestData } from './register/register.guard';
import { CredentialsRequestComponent } from './requests/credentials/credentials-request.component';
import { RegistrationRequestComponent } from './requests/registration/registration-request.component';
import { ResetComponent } from './reset/reset.component';
import { ResetGuard } from './reset/reset.guard';

/**
 * @description Auth Routing
 */
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivateChild: [ PreventLogged ],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { title: translate('LOGIN') } },
      { path: 'register/:hash', component: RegisterComponent, resolve: { request: RegistrationRequestData }, data: { title: translate('REGISTRATION') } },
      { path: 'reset/:hash', component: ResetComponent, canActivate: [ ResetGuard ], data: { title: translate('RESET') } },
    ],
  },
  {
    path: 'logout',
    component: AuthComponent,
    children: [
      { path: '', component: LogoutComponent, canActivate: [ AuthGuard ], data: { noToast: true, title: translate('LOGOUT') } },
    ],
  },
  {
    path: 'request',
    component: AuthComponent,
    canActivateChild: [ PreventLogged ],
    children: [
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'registration', component: RegistrationRequestComponent, data: { title: translate('REGISTRATION') } },
      { path: 'credentials', component: CredentialsRequestComponent, data: { title: translate('CREDENTIALS') } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRouting { }
