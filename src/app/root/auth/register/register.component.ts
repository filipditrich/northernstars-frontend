import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordStrength, passwordConfirmation, translate, ErrorHelper } from '../../../@shared/helpers';
import { ITeam, IRegisterRequest } from '../../../@shared/models';
import { ToasterService } from 'angular2-toaster';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public hash: string;
  public request: any;
  public form: FormGroup;
  public isLoading = true;
  public teams: ITeam[] = [];

  constructor(private httpClient: HttpClient,
              private toasterService: ToasterService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private errorHelper: ErrorHelper) {

    // TODO - Validators import settings from server (minlength, maxlength etc...)
    // alongside with assets (backend)
    /**
     * @description Form Group
     * @type {FormGroup}
     */
    this.form = new FormGroup({
      username: new FormControl(null, [ Validators.required, Validators.minLength(2), Validators.maxLength(32) ]),
      name: new FormControl(null, [ Validators.required, Validators.minLength(2) ]),
      password: new FormControl(null, [ Validators.required, passwordStrength() ]),
      number: new FormControl(null, [ Validators.min(0) ]),
      team: new FormControl(null, [ Validators.required ]),
      passwordSubmit: new FormControl(null, [ Validators.required ]),
    }, passwordConfirmation());

    // Get the teams and list them in the <select>
    this.authService.getRegistrationTeams().subscribe(response => {
      if (response.response.success) {
        this.teams = response.output;
        this.isLoading = false;
      } else {
        this.errorHelper.processedButFailed(response);
      }
    }, error => {
      this.errorHelper.handleGenericError(error);
    });

  }

  // Getters
  get username(): AbstractControl { return this.form.get('username'); }
  get name(): AbstractControl { return this.form.get('name'); }
  get password(): AbstractControl { return this.form.get('password'); }
  get number(): AbstractControl { return this.form.get('number'); }
  get passwordSubmit(): AbstractControl { return this.form.get('passwordSubmit'); }
  get team(): AbstractControl { return this.form.get('team'); }

  /** ngOnInit **/
  ngOnInit(): void {
    this.team.setValue(0, { onlySelf: true });
    this.route.data.subscribe(data => {
      this.request = data.request;
    }, error => {
      this.errorHelper.handleGenericError(error);
    });
    this.hash = this.route.snapshot.paramMap.get('hash');
    if (this.request) { this.name.setValue(this.request); }
  }

  /**
   * @description Marks all fields as touched
   */
  markAllAsTouched(): void {
    this.username.markAsTouched();
    this.name.markAsTouched();
    this.password.markAsTouched();
    this.number.markAsTouched();
    this.passwordSubmit.markAsTouched();
    this.team.markAsTouched();
  }

  /**
   * @description Handler for onSubmit event
   * @param {IRegisterRequest} input
   */
  onSubmit(input: IRegisterRequest): void {
    if (this.form.valid) {
      this.callRegistrationService(input);
    } else {
      this.markAllAsTouched();
    }
  }

  /**
   * @description Calls the Registration service
   * @param {IRegisterRequest} input
   */
  callRegistrationService(input: IRegisterRequest): void {
    this.isLoading = true;
    this.authService.registerUser(this.hash, input).subscribe(response => {
      if (response.response.success && response.output.user) {
        this.router.navigate(['/auth']).then(() => {
          this.toasterService.popAsync('success', translate('REGISTERED_TITLE'), translate('REGISTERED_MSG'));
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
        case 'USERNAME_IN_USE': { this.username.setErrors({ 'in-use' : true }); break; }
        default: { this.errorHelper.handleGenericError(err); break; }
      }
    });
  }

}
