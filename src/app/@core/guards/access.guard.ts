import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserRoles } from '../../@shared/models';
import { SecurityService } from '../services/security.service';
import { Toast, ToasterService } from 'angular2-toaster';
import { translate, ErrorHelper } from '../../@shared/helpers';

/**
 * Prevents non-logged access
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private securityService: SecurityService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }

  /**
   * @description Resolve function
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (SecurityService.isTokenValid()) {
      return true;
    } else {
      const returnUrl = route.url;
      this.router.navigate(['/auth/'], { queryParams: { return: returnUrl } })
        .then(() => {
          if (!route.data['noToast']) {
            const hasBeenLogged = localStorage.getItem('user') || false;
            let toast: Toast;

            if (hasBeenLogged) {
              toast = {
                type: 'warning',
                title: translate('TOKEN_EXP_TITLE'),
                body: translate('TOKEN_EXP_MSG'),
              };
            } else {
              toast = {
                type: 'error',
                title: translate('NOT_LOGGED_TITLE'),
                body: translate('NOT_LOGGED_MSG'),
              };
            }
            this.toasterService.popAsync(toast);
          }
        })
        .catch(error => {
          this.errorHelper.handleGenericError(error);
        });
      return false;
    }
  }

}

/**
 * Prevents already logged in users to access certain pages (login, register etc.)
 */
@Injectable()
export class PreventLogged implements CanActivate, CanActivateChild {

  constructor(private securityService: SecurityService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }

  /**
   * @description Resolve function
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (SecurityService.isTokenValid()) {
      this.router.navigate([ route.queryParamMap.get('return') || '/' ]).then(() => {
        const toast: Toast = {
          type: 'warning',
          title: translate('WARNING'),
          body: translate('ALREADY_LOGGED'),
        };
        this.toasterService.popAsync(toast);
      }).catch(error => {
        this.errorHelper.handleGenericError(error);
      });
      return false;
    } else {
      return true;
    }
  }
}

/**
 * Grants access to the page only for specified roles in route data
 */
@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { return this.resolve(route, state); }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRoles = SecurityService.getUser().roles;
    let allowed: UserRoles[] = [];
    if (!Array.isArray(route.data['roles'])) {
      allowed.push(route.data['roles']);
    } else { allowed = route.data['roles']; }

    if (userRoles && allowed.some(role => userRoles.indexOf(role) >= 0)) {
      return true;
    } else {
      const redirect = SecurityService.getUser() ? '/' : '/auth';
      this.router.navigate([ redirect ]).then(() => {
        const toast: Toast = {
          type: 'error',
          title: translate('UNAUTHORIZED_TITLE'),
          body: translate('UNAUTHORIZED_MSG'),
        };
        this.toasterService.popAsync(toast);
        return false;
      }).catch(error => {
        this.errorHelper.handleGenericError(error);
      });
    }
  }

}
