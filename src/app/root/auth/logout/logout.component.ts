import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { SecurityService } from '../../../@core/services/security.service';
import { translate, ErrorHelper } from '../../../@shared/helpers';

@Component({
  selector: 'ngx-logout',
  template: `{{ 'LOG_OUT_PROCESS' | translate }}`,
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    SecurityService.logOut();
    this.router.navigate(['/auth/']).then(() => {
      this.toasterService.popAsync('info', translate('LOGGED_OUT_TITLE'), translate('LOGGED_OUT_MSG'));
    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

}
