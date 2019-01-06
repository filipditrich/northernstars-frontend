import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { translate, passwordStrength, passwordConfirmation, ErrorHelper } from '../../../@shared/helpers';
import { IResetRequest } from '../../../@shared/models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-cred-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {

  public form: FormGroup;
  public isLoading = true;
  public hash: string;

  constructor(private httpClient: HttpClient,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService,
              private authService: AuthService) {

    /**
     * @description Form Group
     * @type {FormGroup}
     */
    this.form = new FormGroup({
      password: new FormControl(null, [ Validators.required, passwordStrength() ]),
      passwordSubmit: new FormControl(null, [ Validators.required ]),
    }, passwordConfirmation());
    this.hash = this.route.snapshot.paramMap.get('hash');
  }

  // Getters
  get password(): AbstractControl { return this.form.get('password'); }
  get passwordSubmit(): AbstractControl { return this.form.get('passwordSubmit'); }

  /** ngOnInit **/
  ngOnInit(): void {
    this.isLoading = false;
  }

  /**
   * @description Marks all fields as touched
   */
  markAllAsTouched(): void {
    this.password.markAsTouched();
    this.passwordSubmit.markAsTouched();
  }

  /**
   * @description Handler for onSubmit event
   * @param input
   */
  onSubmit(input: IResetRequest): void {
    if (this.form.valid) {
      this.callPasswordResetService(input);
    } else {
      this.markAllAsTouched();
    }
  }

  /**
   * @description Calls the Password Reset service
   * @param input
   */
  callPasswordResetService(input: IResetRequest): void {
    this.isLoading = true;
    this.authService.createNewPassword(this.hash, input).subscribe(response => {
      if (response.response.success) {
        this.router.navigate(['/auth/']).then(() => {
          this.toasterService.popAsync('success', translate('PASS_RES_CHANGED_TITLE'), translate('PASS_RES_CHANGED_MSG'));
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

      switch (error.name || error.type) {
        case 'NEW_PASSWORD_IS_OLD': { this.password.setErrors({ 'new-is-old' : true }); break; }
        default: { this.errorHelper.handleGenericError(err); break; }
      }
    });
  }

}
