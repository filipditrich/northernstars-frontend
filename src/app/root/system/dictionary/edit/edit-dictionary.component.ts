import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { SecurityService } from '../../../../@core/services/security.service';
import { DefaultEditModalComponent } from '../../../../@shared/components';
import { ErrorHelper, HumanizerHelper, isUpperCase } from '../../../../@shared/helpers';
import { IDict } from '../../../../@shared/models';
import { UsersService } from '../../../../@shared/services';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'ngx-system-edit-dictionary',
  templateUrl: './edit-dictionary.component.html',
  styleUrls: ['./edit-dictionary.component.scss'],
})
export class EditDictionaryComponent extends DefaultEditModalComponent implements OnInit {

  @Input() dictionary: IDict;

  constructor(public toaster: ToasterService,
              public activeModal: NgbActiveModal,
              public usersService: UsersService,
              public errorHelper: ErrorHelper,
              private modalService: NgbModal,
              private humanizer: HumanizerHelper,
              private dictService: DictionaryService) {

    // super() call for derived classes
    super(toaster, activeModal, usersService, errorHelper);

    // Form Group
    this.form = new FormGroup({
      id: new FormControl(null, [ Validators.required, isUpperCase ]),
      cs: new FormControl(null, [ Validators.required ]),
      en: new FormControl(null, [ Validators.required ]),
      createdBy: new FormControl(null, [ Validators.required ]),
      createdAt: new FormControl(null, [ Validators.required ]),
      updatedBy: new FormControl(null, [ Validators.required ]),
      updatedAt: new FormControl(null, [ Validators.required ]),
    });
  }

  // Getters
  get id() { return this.form.get('id'); }
  get cs() { return this.form.get('cs'); }
  get en() { return this.form.get('en'); }
  get createdBy() { return this.form.get('createdBy'); }
  get createdAt() { return this.form.get('createdAt'); }
  get updatedBy() { return this.form.get('updatedBy'); }
  get updatedAt() { return this.form.get('updatedAt'); }


  /**
   * ngOnInit Implementation
   */
  ngOnInit(): void {
    this.init().then(() => {
      this.id.setValue(this.dictionary.id);
      this.cs.setValue(this.dictionary.cs);
      this.en.setValue(this.dictionary.en);
      this.createdBy.setValue(this.resolveUserField(this.dictionary.createdBy));
      this.createdAt.setValue(this.dictionary.createdAt);
      this.updatedBy.setValue(this.resolveUserField(this.dictionary.updatedBy));
      this.updatedAt.setValue(this.dictionary.updatedAt);

      // Enable changes in Timestamp fields only for Super Administrators
      if (!SecurityService.isSuper()) {
        this.createdBy.disable();
        this.createdAt.disable();
        this.updatedBy.disable();
        this.updatedAt.disable();
      }
    });
  }

  /**
   * @description Calls the service with update request
   * @param dict
   */
  update(dict: IDict): void {
    this.isLoading = true;
    this.dictService.update(this.dictionary.id, dict).subscribe(response => {
      if (response.response.success) {
        this.updateSuccessToaster(dict.id);
        this.closeModal(true);
      } else {
        this.errorHelper.processedButFailed(response);
      }
    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  /**
   * @description Forces the <ID> input to be upper case
   */
  onIDChange(): void {
    const val = this.id.value.toUpperCase();
    this.id.setValue(val, { onlySelf: true });
  }

  /**
   * @description Returns if the values are still same as original
   * @returns {boolean}
   */
  isSame(): boolean {
    // assign correct values to the original object
    const original: any = { ...this.dictionary };
    original.createdBy = original.createdBy._id;
    original.updatedBy = original.updatedBy._id;

    return !this.isChanged(original, this.form.value);
  }


}
