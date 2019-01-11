import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToasterService } from 'angular2-toaster';
import { ErrorHelper, translate, focusField } from '../../helpers';
import { IUser, UserRoles } from '../../models';
import { UsersService } from '../../services';

@Component({
  selector: 'ngx-default-edit-modal',
  template: ``,
})
export class DefaultEditModalComponent {

  public form: FormGroup;
  public isLoading: boolean = true;
  public users: IUser[];
  private _users: IUser[];
  public focusField: Function = focusField;

  constructor(public toaster: ToasterService,
              public activeModal: NgbActiveModal,
              public usersService: UsersService,
              public errorHelper: ErrorHelper) {
  }

  /**
   * @description Initializes all core functions
   * @returns {Promise<any>}
   */
  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUsers()
        .then(users => {
          this._users = users;
          this.users = users.filter(x => x.roles.indexOf(UserRoles.Deleted) < 0);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description Handler for onSubmit event
   */
  onSubmit() {
    this.form.valid ? this.update(this.form.value) : this.markAllAsTouched();
  }

  /**
   * @description Calls the service with update request
   * @param val
   */
  update(val: any): void { }

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
   * @description Toaster to show when the updating succeeded
   * @param value
   */
  updateSuccessToaster(value: string): void {
    const toast: Toast = {
      type: 'info',
      title: translate('UPDATE_SUCCESS_TITLE'),
      body: translate('UPDATE_SUCCESS_MSG', { value }),
    };
    this.toaster.popAsync(toast);
  }

  /**
   * @description Returns an array of users
   * @returns {Promise<IUser[]>}
   */
  getUsers(): Promise<IUser[]> {
    return this.usersService.get('', true).toPromise()
      .then(response => {
        if (response.response.success) {
          return response.output;
        } else {
          this.errorHelper.processedButFailed(response);
        }
      }).catch(error => {
        this.errorHelper.handleGenericError(error);
      });
  }

  /**
   * @description Resolves what to do with the specified input and field
   * in order to have valid users array to select from
   * @param input
   */
  resolveUserField(input: IUser): string {
    const deletedUser: IUser = this._users.find(x => x.roles.indexOf(UserRoles.Deleted) >= 0);
    if (input && input._id) {
      if (this.users.findIndex(x => x._id === input._id) >= 0) {
        return input._id;
      } else if (input.username === deletedUser.username) {
        if (this.users.findIndex(x => x._id === input._id) < 0) {
          this.users.push(input);
        }
        return input._id;
      } else {
        if (this.users.findIndex(x => x._id === deletedUser._id) < 0) {
          this.users.push(deletedUser);
        }
        return deletedUser._id;
      }
    }
  }

  /**
   * @description Returns if <original> is changed compared to the <form>
   * @param original
   * @param form
   * @returns {boolean}
   */
  isChanged(original: any, form: any): boolean {
    // get common keys of the <original> and <form>
    const common = Object.keys(original)
      .filter(x => Object.keys(form).indexOf(x) >= 0);

    for (const key of common) {
      // return true if any of the value is not same
      if (original[key] !== form[key]) return true;
    }

    // if no differences return false
    return false;

  }

}
