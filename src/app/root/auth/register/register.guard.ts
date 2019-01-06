import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthService } from '../auth.service';
import { ErrorHelper, translate } from '../../../@shared/helpers';

/**
 * Resolve Registration Request Validity and Data
 */
@Injectable()
export class RegistrationRequestData implements Resolve<any> {

  constructor(private authService: AuthService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    const hash: string = route.paramMap.get('hash');

    return this.authService.getRegistrationRequest(hash).toPromise().then(response => {
      if (response.response.success && response.output) {
        return response.output;
      } else {
        this.router.navigate(['/auth']).then(() => {
          this.errorHelper.processedButFailed(response);
        });
        return;
      }
    }).catch(err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.router.navigate(['/auth']).then(() => {
        switch (error.name) {
          case 'REQUEST_INVALID': { this.toasterService.popAsync('error', translate('REQUEST_INVALID_TITLE'), translate('REQUEST_INVALID_MSG')); break; }
          default: { this.errorHelper.handleGenericError(error); break; }
        }
      });
      return;
    });
  }
}
