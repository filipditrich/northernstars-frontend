import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreventLogged } from '../../@core/guards/access.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestData } from './register/register.guard';
import { RegistrationRequestComponent } from './requests/registration/registration-request.component';

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
      { path: 'logout', component: LogoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRouting { }
