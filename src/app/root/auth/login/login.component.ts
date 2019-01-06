import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SecurityService } from '../../../@core/services/security.service';
import { ILoginRequest } from '../../../@shared/models/auth.model';
import { ErrorHelper, sysInfo, translate } from '../../../@shared/helpers';
import { UserRoles } from '../../../@shared/models';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isLoading = true;

  constructor(private httpClient: HttpClient,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService,
              private authService: AuthService,
              private security: SecurityService) {

    /**
     * @description Form Group
     * @type {FormGroup}
     */
    this.form = new FormGroup({
      username: new FormControl(null, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
      rememberMe: new FormControl(null, []),
    });

  }

  // Getters
  get username(): AbstractControl { return this.form.get('username'); }
  get password(): AbstractControl { return this.form.get('password'); }
  get rememberMe(): AbstractControl { return this.form.get('rememberMe'); }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.rememberMe.setValue(Boolean(localStorage.getItem('rememberMe')));
    this.isLoading = false;
  }

  /**
   * @description Marks all fields as touched
   */
  markAllAsTouched(): void {
    this.username.markAsTouched();
    this.password.markAsTouched();
  }

  /**
   * @description Handler for onSubmit event
   * @param input
   */
  onSubmit(input: ILoginRequest): void {
    if (this.form.valid) {
      this.callLoginService(input);
    } else {
      this.markAllAsTouched();
    }
  }

  /**
   * @description Calls the login service
   * @param input
   */
  callLoginService(input: ILoginRequest): void {
    this.isLoading = true;
    this.authService.logInRequest(input).subscribe(response => {
      if (response.response.success && response.output['token']) {
        if (moment().isBefore(new Date(sysInfo('launchDate'))) && response.output['user']['roles'].indexOf(UserRoles.Admin) < 0) {
          this.router.navigate(['/auth/locked']);
        } else {
          SecurityService.storeUserData(response.output['user'], response.output['token'], this.rememberMe.value);
          const returnUrl = this.route.snapshot.queryParamMap.has('return') ? this.route.snapshot.queryParamMap.get('return') : false;
          this.router.navigate([ returnUrl || '/' ]).then(() => {
            this.toasterService.popAsync('success', translate('LOGGED_IN_TITLE'), translate('LOGGED_IN_MSG'));
          }).catch(error => {
            this.errorHelper.handleGenericError(error);
            this.isLoading = false;
          });
        }
      } else {
        this.errorHelper.processedButFailed(response);
        this.toasterService.popAsync('error', response.response.name || 'Unexpected', response.response.message || 'Unexpected error occurred');
      }
    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.isLoading = false;

      switch (error.name || error.type) {
        case 'USERNAME_MISMATCH': { this.username.setErrors({ 'no-match' : true }); break; }
        case 'PASSWORD_MISMATCH': { this.password.setErrors({ 'no-match' : true }); break; }
        default: { this.errorHelper.handleGenericError(err); break; }
      }
    });
  }

}
