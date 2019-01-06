import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ToasterService } from 'angular2-toaster';
import { SecurityService } from '../../../@core/services/security.service';
import {ErrorHelper, translate} from '../../../@shared/helpers';
import { AuthService } from '../auth.service';

@Injectable()
export class ResetGuard implements CanActivate {

  constructor(private securityService: SecurityService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService,
              private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }

  /**
   * @description Resolve function
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hash = route.paramMap.get('hash');
    return new Observable<boolean>(observer => {
      this.authService.checkPasswordResetRequest(hash).subscribe(response => {
        if (response.response.success) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigate(['/auth/']).then(() => {
            this.errorHelper.processedButFailed(response);
          }).catch(error => {
            this.errorHelper.handleGenericError(error);
          });
          observer.next(false);
          observer.complete();
        }
      }, err => {
        const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
        this.router.navigate(['/auth']).then(() => {
          switch (error.name) {
            case 'REQUEST_INVALID': { this.toasterService.popAsync('error', translate('REQUEST_INVALID_TITLE'), translate('REQUEST_INVALID_MSG')); break; }
            default: { this.errorHelper.handleGenericError(error); break; }
          }
          observer.next(false);
          observer.complete();
        });
      });
    });
  }
}
