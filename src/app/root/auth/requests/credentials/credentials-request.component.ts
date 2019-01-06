import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { translate, ErrorHelper, isEmail } from '../../../../@shared/helpers';
import { ToasterService } from 'angular2-toaster';
import { IResetInput } from '../../../../@shared/models';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'ngx-credentials-request',
  templateUrl: './credentials-request.component.html',
  styleUrls: ['./credentials-request.component.scss'],
})
export class CredentialsRequestComponent implements OnInit {

  public form: FormGroup;
  public isLoading = false;

  constructor(private httpClient: HttpClient,
              private fb: FormBuilder,
              private router: Router,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService,
              private authService: AuthService) {

    /**
     * @description Form Group
     * @type {FormGroup}
     */
    this.form = new FormGroup({
      type: new FormControl(null, [ Validators.required ]),
      username: new FormControl(null, []),
      email: new FormControl(null, [ isEmail ]),
    });

  }

  // Getters
  get username(): AbstractControl { return this.form.get('username'); }
  get email(): AbstractControl { return this.form.get('email'); }
  get type(): AbstractControl { return this.form.get('type'); }

  /** ngOnInit **/
  ngOnInit(): void {
    // set default value
    this.type.setValue('password', { onlySelf: true });
  }

  /**
   * @description Handler for onChange event
   */
  onChange(): void {
    this.email.setErrors(null);
    this.email.setValue(null);
    this.email.markAsUntouched();
    this.username.setErrors(null);
    this.username.setValue(null);
    this.username.markAsUntouched();
  }

  /**
   * @description Marks all fields as touched
   */
  markAllAsTouched(): void {
    this.email.markAsTouched();
    this.username.markAsTouched();
    this.type.markAsTouched();
  }

  /**
   * @description Handler for when the request failed and fields needs to be updated
   * @param input
   */
  fieldErrorRefresh(input: IResetInput): void {
    if (input.username) {
      this.type.reset();
      this.type.setValue(input.type, { onlySelf: true });
      this.onChange();
      this.username.setValue(input.username, { onlySelf: true });
    } else if (input.email) {
      this.type.reset();
      this.type.setValue(input.type, { onlySelf: true });
      this.onChange();
      this.email.setValue(input.email, { onlySelf: true });
    }
  }

  /**
   * @description Handler for onSubmit event
   * @param input
   */
  onSubmit(input: IResetInput): void {
    this.markAllAsTouched();

    if (input.type === 'username' && input.email) input.username = '';
    if (input.email) {
      this.username.setValue(' ');
    } else if (input.username) {
      this.email.setValue(' ');
    }

    if (this.form.valid && (input.username || input.email)) {
      if (input.username === ' ') input.username = false;
      if (input.email === ' ') input.email = false;
      if (input.type === 'password') {
        this.username.setErrors({ 'required': false });
        this.requestPassword(input);
      } else if (input.type === 'username') {
        this.username.setErrors({ 'required': false });
        this.requestUsername(input);
      }
    }
  }

  /**
   * @description Calls the service for Password Reset Request
   * @param input
   */
  requestPassword(input: IResetInput): void {
    this.isLoading = true;
    this.authService.requestPasswordReset(input).subscribe(response => {
      if (response.response.success) {
        this.router.navigate(['/auth/']).then(() => {
          this.toasterService.popAsync('info', translate('EMAIL_SENT'), translate('PWD_RES_SENT_MSG'));
        }).catch(error => {
          this.errorHelper.handleGenericError(error);
        });
      } else {
        this.isLoading = false;
        this.errorHelper.processedButFailed(response);
      }
    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.isLoading = false;
      this.fieldErrorRefresh(input);

      switch (error.name || error.type) {
        case 'RESET_REQUEST_ALREADY_MADE': {
          if (input.username) this.username.setErrors({ 'req-dup' : true });
          else this.email.setErrors({ 'req-dup' : true });
          break;
        }
        case 'USER_NOT_FOUND': {
          if (input.username) this.username.setErrors({ 'not-found' : true });
          else  this.email.setErrors({ 'not-found' : true });
          break;
        }
        case 'EMAIL_NOT_FOUND': { this.email.setErrors({ 'not-found' : true }); break; }
        default: { this.errorHelper.handleGenericError(err); break; }
      }
    });
  }

  /**
   * @description Calls the service for Username Reset Request
   * @param input
   */
  requestUsername(input: IResetInput): void {
    this.isLoading = true;
    this.authService.sendUsernameToEmail(input).subscribe(response => {
      if (response.response.success) {
        this.router.navigate(['/auth/']).then(() => {
          this.toasterService.popAsync('info', translate('EMAIL_SENT'), translate('USN_RES_SENT_MSG'));
        }).catch(error => {
          this.errorHelper.handleGenericError(error);
        });
      } else {
        this.isLoading = false;
        this.errorHelper.processedButFailed(response);
      }
    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.isLoading = false;
      this.fieldErrorRefresh(input);

      switch (error.name || error.type) {
        case 'EMAIL_NOT_FOUND': { this.email.setErrors({ 'not-found' : true }); break; }
        default: { this.errorHelper.handleGenericError(err); break; }
      }
    });
  }

}
