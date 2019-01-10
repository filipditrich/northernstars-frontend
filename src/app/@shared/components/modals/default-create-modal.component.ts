import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToasterService } from 'angular2-toaster';
import { translate } from '../../helpers';

@Component({
  selector: 'ngx-default-create-modal',
  template: ``,
})
export class DefaultCreateModalComponent {

  public form: FormGroup;
  public isLoading: boolean;

  constructor(public toaster: ToasterService,
              public activeModal: NgbActiveModal) {
  }

  /**
   * @description Handler for onSubmit event
   */
  onSubmit() {
    this.form.valid ? this.create(this.form.value) : this.markAllAsTouched();
  }

  /**
   * @description Calls the service with creation request
   * @param val
   */
  create(val: any): void { }

  /**
   * @description Marks all form's controls (or controls provided in ctrlArray parameter) as touched
   * @param controls
   */
  markAllAsTouched(controls?: { [key: string]: AbstractControl }): void {
    for (const ctrl of Object.keys(controls || this.form.controls)) {
      this.form.controls[ctrl].markAsTouched();
    }
  }

  /**
   * @description Closes the current modal window
   * @param re
   */
  closeModal(re: boolean): void {
    this.activeModal.close(re);
  }

  /**
   * @description Toaster to show when the creating succeeded
   * @param value
   */
  createSuccessToaster(value: string): void {
    const toast: Toast = {
      type: 'success',
      title: translate('CREATE_SUCCESS_TITLE'),
      body: translate('CREATE_SUCCESS_MSG', { value }),
    };
    this.toaster.popAsync(toast);
  }

}
