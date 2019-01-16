import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" tabindex="-1" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" [innerHTML]="modalContent"></div>
    <div class="modal-footer flex-wrap">
      <button *ngFor="let button of modalButtons" class="btn btn-md {{button.classes}} my-1" (click)="button.action()">{{button.text}}</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultModalComponent implements AfterViewChecked {

  @Input() modalHeader: string;
  @Input() modalContent: string;
  @Input() modalButtons = [];

  constructor(private activeModal: NgbActiveModal,
              private ref: ChangeDetectorRef) { }

  closeModal(): void {
    this.activeModal.close(false);
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
}

/**
 * @description Returns default modal options modified with optional input <opts>
 * @param opts
 * @returns {NgbModalOptions}
 */
export function defaultModalOptions(opts?: NgbModalOptions): NgbModalOptions {

  // default options
  const options: NgbModalOptions = {
    container: 'nb-layout',
    keyboard: false,
    backdrop: 'static',
  };

  // assign inputted values
  for (const opt of opts ? Object.keys(opts) : []) {
    options[opt] = opts[opt];
  }

  return options;
}
