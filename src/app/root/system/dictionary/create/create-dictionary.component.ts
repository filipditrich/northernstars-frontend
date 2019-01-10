import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { DefaultCreateModalComponent } from '../../../../@shared/components/modals/default-create-modal.component';
import { ErrorHelper, HumanizerHelper, isUpperCase } from '../../../../@shared/helpers';
import { IDict } from '../../../../@shared/models';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'ngx-system-create-dictionary',
  templateUrl: './create-dictionary.component.html',
  styleUrls: ['./create-dictionary.component.scss'],
})
export class CreateDictionaryComponent extends DefaultCreateModalComponent implements OnInit {

  constructor(public toaster: ToasterService,
              public activeModal: NgbActiveModal,
              private errorHelper: ErrorHelper,
              private modalService: NgbModal,
              private humanizer: HumanizerHelper,
              private dictService: DictionaryService) {

    // super() call for derived classes
    super(toaster, activeModal);

    // Form Group
    this.form = new FormGroup({
      id: new FormControl(null, [ Validators.required, isUpperCase ]),
      cs: new FormControl(null, [ Validators.required ]),
      en: new FormControl(null, [ Validators.required ]),
    });
  }

  // Getters
  get id() { return this.form.get('id'); }
  get cs() { return this.form.get('cs'); }
  get en() { return this.form.get('en'); }

  /**
   * ngOnInit Implementation
   */
  ngOnInit(): void {
    this.isLoading = false;
  }

  /**
   * @description Calls the service with creation request
   * @param dict
   */
  create(dict: IDict): void {
    this.isLoading = true;
    this.dictService.create(dict).subscribe(response => {
      this.isLoading = false;
      if (response.response.success) {
        this.createSuccessToaster(dict.id);
        this.activeModal.close(true);
      } else {
        this.errorHelper.processedButFailed(response);
      }
    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.isLoading = false;

      // Switch the error name
      switch (error.name || error.type) {
        case 'DICTIONARY_DUPLICATE': this.id.setErrors({ 'duplicate': true }); break;
        default: this.errorHelper.handleGenericError(error); break;
      }
    });
  }

  /**
   * @description Forces the <ID> input to be upper case
   */
  onIDChange(): void {
    const val = this.id.value.toUpperCase();
    this.id.setValue(val, { onlySelf: true });
  }

}
