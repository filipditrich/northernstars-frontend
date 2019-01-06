import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { translate, ErrorHelper } from '../../../../@shared/helpers';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { IRegistrationRequest } from '../../../../@shared/models';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'ngx-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.scss'],
})
export class RegistrationRequestComponent implements OnInit {

  public form: FormGroup;
  public isLoading = true;

  constructor(private httpClient: HttpClient,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private errorHelper: ErrorHelper,
              private toasterService: ToasterService) {

    /**
     * @description Form Group
     * @type {FormGroup}
     */
    // TODO - import settings from server (frontend conf)
    // alongside with assets (backend)
    this.form = new FormGroup({
      name: new FormControl(null, [ Validators.required, Validators.minLength(2) ]),
      email: new FormControl(null, [ Validators.required, Validators.email ]),
    });

  }

  // Getters
  get name(): AbstractControl { return this.form.get('name'); }
  get email(): AbstractControl { return this.form.get('email'); }

  /** ngOnInit **/
  ngOnInit(): void {
    this.isLoading = false;
  }

  /**
   * @description Marks all fields as touched
   */
  markAllAsTouched(): void {
    this.name.markAsTouched();
    this.email.markAsTouched();
  }

  /**
   * @description Handler for onSubmit event
   * @param {IRegistrationRequest} input
   */
  onSubmit(input: IRegistrationRequest): void {
    if (this.form.valid) {
      this.makeRequest(input);
    } else {
      this.markAllAsTouched();
    }
  }

  /**
   * @description Calls the Registration Request service
   * @param {IRegistrationRequest} input
   */
  makeRequest(input: IRegistrationRequest): void {
    this.isLoading = true;
    this.authService.requestRegistration(input).subscribe(response => {
      if (response.response.success) {
        // TODO - page with you request is waiting to be accepted blah blah blah...
        this.router.navigate(['/auth/']).then(() => {
          this.toasterService.popAsync('success', translate('REG_REQ_SENT_TITLE'), translate('REG_REQ_SENT_MSG'));
        }).catch(error => {
          this.errorHelper.handleGenericError(error);
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
        this.errorHelper.processedButFailed(response);
      }
    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.isLoading = false;

      switch (error.name || error.type) {
        case 'REQUEST_WITH_EMAIL_ALREADY_MADE': { this.email.setErrors({ 'in-use' : true }); break; }
        case 'EMAIL_ALREADY_REQUESTED': { this.email.setErrors({ 'in-use' : true }); break; }
        default: { this.errorHelper.handleGenericError(err); }
      }
    });
  }

}
