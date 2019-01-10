import { Component, Input } from '@angular/core';
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
})
export class DefaultModalComponent {

  @Input() modalHeader: string;
  @Input() modalContent: string;
  @Input() modalButtons = [];

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close(false);
  }
}

export const DefaultModalOptions: NgbModalOptions = {
  container: 'nb-layout',
  keyboard: false,
  backdrop: 'static',
};
