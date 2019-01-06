import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreventLogged } from '../../@core/guards/access.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestData } from './register/register.guard';
import {CredentialsRequestComponent} from './requests/credentials/credentials-request.component';
import { RegistrationRequestComponent } from './requests/registration/registration-request.component';
import {ResetComponent} from './reset/reset.component';
import {ResetGuard} from './reset/reset.guard';

/**
 * @description Auth Routing
 */
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [ PreventLogged ] },
      { path: 'register/:hash', component: RegisterComponent, canActivate: [ PreventLogged ], resolve: { request: RegistrationRequestData } },
      { path: 'registration-request', component: RegistrationRequestComponent, canActivate: [ PreventLogged ] },
      { path: 'reset/:hash', component: ResetComponent, canActivate: [ PreventLogged, ResetGuard ] },
      { path: 'credentials-request', component: CredentialsRequestComponent, canActivate: [ PreventLogged ] },
      { path: 'logout', component: LogoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRouting { }
