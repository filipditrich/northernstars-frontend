import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';
import { AuthGuard, PreventLogged, RoleGuard } from '../@core/guards';
import { HttpHeadersInterceptor } from '../@core/services/http–interceptor.service';
import { SharedModule } from '../@shared/shared.module';
import { ThemeModule } from '../@theme/theme.module';

import { HomeComponent } from './home';
import { RootRouting } from './root.routing';
import { RootComponent } from './root.component';

@NgModule({
  imports: [
    RootRouting,
    ThemeModule,
    SharedModule,
    NbAuthModule,
  ],
  declarations: [
    RootComponent,
    HomeComponent,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    PreventLogged,
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true },
  ],
})
export class RootModule {
}
