import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthModule } from '@nebular/auth';
import { NbSpinnerModule } from '@nebular/theme';
import { HttpHeadersInterceptor } from '../../@core/services/http–interceptor.service';
import { SharedModule } from '../../@shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';
import {AuthService} from './auth.service';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {RegistrationRequestData} from './register/register.guard';
import {CredentialsRequestComponent} from './requests/credentials/credentials-request.component';
import {RegistrationRequestComponent} from './requests/registration/registration-request.component';
import {ResetComponent} from './reset/reset.component';
import {ResetGuard} from './reset/reset.guard';

@NgModule({
  imports: [
    CommonModule,
    AuthRouting,
    ReactiveFormsModule,
    ThemeModule,
    NbSpinnerModule,
    SharedModule,
    NbAuthModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RegistrationRequestComponent,
    ResetComponent,
    CredentialsRequestComponent,
  ],
  providers: [
    AuthService,
    RegistrationRequestData,
    ResetGuard,
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule { }
