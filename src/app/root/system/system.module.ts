import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthModule } from '@nebular/auth';
import { NbSpinnerModule } from '@nebular/theme';
import { HttpHeadersInterceptor } from '../../@core/services/http–interceptor.service';
import { SharedModule } from '../../@shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SystemInfoComponent } from './info/system-info.component';
import { SystemRouting } from './system.routing';

@NgModule({
  imports: [
    CommonModule,
    SystemRouting,
    ReactiveFormsModule,
    ThemeModule,
    NbSpinnerModule,
    SharedModule,
    NbAuthModule,
  ],
  declarations: [
    SystemInfoComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
  ],
})
export class SystemModule { }
