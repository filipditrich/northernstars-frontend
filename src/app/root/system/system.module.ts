import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng2SmartTableExtendedModule } from 'ng2-smart-table-extended';
import { HttpHeadersInterceptor } from '../../@core/services/http–interceptor.service';
import { SharedModule } from '../../@shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CreateDictionaryComponent } from './dictionary/create/create-dictionary.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { EditDictionaryComponent } from './dictionary/edit/edit-dictionary.component';
import { SystemInfoComponent } from './info/system-info.component';
import { SystemRouting } from './system.routing';

@NgModule({
  imports: [
    CommonModule,
    SystemRouting,
    ReactiveFormsModule,
    ThemeModule,
    NbSpinnerModule,
    NbTooltipModule,
    SharedModule,
    Ng2SmartTableExtendedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    SystemInfoComponent,
    DictionaryComponent,
    CreateDictionaryComponent,
    EditDictionaryComponent,
  ],
  entryComponents: [
    CreateDictionaryComponent,
    EditDictionaryComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
  ],
})
export class SystemModule { }
