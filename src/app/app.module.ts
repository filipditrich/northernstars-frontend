import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { CoreModule } from './@core/core.module';
import { GlobalErrorHandler } from './@core/services/error-handler.service';
import { HttpHeadersInterceptor } from './@core/services/http–interceptor.service';
import { PreloadInitializer } from './@core/services/preload.service';
import { SharedModule } from './@shared/shared.module';
import { ThemeModule } from './@theme/theme.module';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { SortablejsModule } from 'angular-sortablejs';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

export function PreloadInitializerProviderFactory(provider: PreloadInitializer) {
  return () => provider.startupConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouting,
    SharedModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToasterModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true },
    { provide: APP_INITIALIZER,
      useFactory: PreloadInitializerProviderFactory,
      deps: [PreloadInitializer],
      multi: true },
    { provide: ErrorHandler,
      useClass: GlobalErrorHandler },
  ],
})
export class AppModule { }
