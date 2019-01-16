import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table-extended';
import { DefaultModalComponent, defaultModalOptions, DefaultTableComponent } from '../../../@shared/components';
import { ErrorHelper, HumanizerHelper, translate } from '../../../@shared/helpers';
import { IDict } from '../../../@shared/models';
import { FilterOptionType } from '../../../@shared/models/table.model';
import { CreateDictionaryComponent } from './create/create-dictionary.component';
import { DictionaryService } from './dictionary.service';
import { EditDictionaryComponent } from './edit/edit-dictionary.component';

@Component({
  selector: 'ngx-system-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent extends DefaultTableComponent implements OnInit {

  constructor(errorHelper: ErrorHelper,
              modalService: NgbModal,
              private humanizer: HumanizerHelper,
              private dictService: DictionaryService,
              private toaster: ToasterService) {

    super(errorHelper, modalService);

    this.storagePrefName = 'dictionary';
    this.source = new LocalDataSource();
    this.filterOptions = {
      autoRefresh: {
        value: true,
        id: 'autoRefresh',
        title: translate('AUTO_REFRESH'),
        type: FilterOptionType.Checkbox,
        options: {
          hint: {
            show: true,
            text: translate('AUTO_REFRESH_HINT'),
          },
        },
      },
      backgroundRefresh: {
        value: false,
        id: 'backgroundRefresh',
        title: translate('BACKGROUND_REFRESH'),
        type: FilterOptionType.Checkbox,
        options: {
          hint: {
            show: true,
            text: translate('BACKGROUND_REFRESH_HINT'),
          },
        },
      },
      rowsPerPage: {
        value: 10,
        id: 'rowsPerPage',
        title: translate('ROWS_PER_PAGE'),
        type: FilterOptionType.Select,
        options: {
          items: [
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '25', value: 25 },
            { label: '50', value: 50 },
          ],
          hint: {
            show: true,
            text: translate('ROWS_PER_PAGE_HINT'),
          },
        },
      },
    };
    this.settings = {
      // selectMode: 'multi',
      edit: {
        editButtonContent: `<i class="icon ion-ios-color-wand fs-large px-3"></i>`,
        editClassFunction: row => '',
      },
      delete: {
        deleteButtonContent: `<i class="icon ion-ios-trash fs-large px-3"></i>`,
        deleteClassFunction: row => '',
      },
      hideSubHeader: true,
      mode: 'external',
      noDataMessage: translate('NO_RECORDS'),
      actions : {
        columnTitle: translate('ACTIONS'),
        add: false,
        edit: true,
        delete: true,
      },
      // contextMenu: {
      //   show: true,
      //   items: [
      //     {
      //       type: 'html',
      //       value: `<span class="fs-normal d-flex align-items-center"><i class="icon ion-ios-help-outline fs-large mr-2"></i>${translate('DETAILS')}</span>`,
      //       action: (row: any) => {
      //         alert(`This would show detail for the following: ${row.data.id}`);
      //       },
      //     },
      //     {
      //       type: 'html',
      //       value: `<span class="fs-normal d-flex align-items-center"><i class="icon ion-ios-color-wand fs-large mr-2"></i>${translate('EDIT')}</span>`,
      //       action: (row: any) => {
      //         this.onEdit(row);
      //       },
      //     },
      //     {
      //       type: 'html',
      //       value: `<span class="text-danger fs-normal d-flex align-items-center"><i class="icon ion-ios-trash fs-large mr-2"></i>${translate('DELETE')}</span>`,
      //       action: (row: any) => {
      //         alert(`This would delete the following: ${row.data.id}`);
      //       },
      //     },
      //   ],
      // },
      rowClassFunction: row => { this.onDelete(row); },
      columns: {},
      pager: {
        perPage: this.filterOptions.rowsPerPage.value,
      },
    };
    this.filters = [
      {
        order: 1,
        id: 'id',
        title: translate('ID'),
        type: 'string',
        checked: false,
        default: true,
        compareFunction: (dir, a, b) => {
          return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) * dir;
        },
      },
      {
        order: 2,
        id: 'cs',
        title: translate('CZECH'),
        type: 'string',
        checked: false,
        default: true,
        compareFunction: (dir, a, b) => {
          return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) * dir;
        },
        valuePrepareFunction: value => {
          if (value.length > 24) { value = value.substring(21, 0) + '...'; }
          return value;
        },
      },
      {
        order: 3,
        id: 'en',
        title: translate('ENGLISH'),
        type: 'string',
        checked: false,
        default: true,
        compareFunction: (dir, a, b) => {
          return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) * dir;
        },
        valuePrepareFunction: value => {
          if (value.length > 24) { value = value.substring(21, 0) + '...'; }
          return value;
        },
      },
      {
        order: 4,
        id: 'createdBy',
        title: translate('CREATED_BY'),
        type: 'string',
        checked: false,
        editable: false,
        default: true,
        valuePrepareFunction: value => value.name,
        compareFunction: (dir, a, b) => {
          return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) * dir;
        },
      },
      {
        order: 5,
        id: 'createdAt',
        title: translate('CREATED_AT'),
        type: 'string',
        checked: false,
        editable: false,
        default: false,
        valuePrepareFunction: value => this.humanizer.date(value),
      },
      {
        order: 6,
        id: 'updatedBy',
        title: translate('UPDATED_BY'),
        type: 'string',
        checked: false,
        editable: false,
        default: true,
        valuePrepareFunction: value => value.name,
        compareFunction: (dir, a, b) => {
          return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) * dir;
        },
      },
      {
        order: 7,
        id: 'updatedAt',
        title: translate('UPDATED_AT'),
        type: 'string',
        checked: false,
        editable: false,
        default: false,
        valuePrepareFunction: value => this.humanizer.date(value),
      },
    ];

  }

  /**
   * ngOnInit implementation
   */
  ngOnInit(): void {
    this.init();
  }

  /**
   * @description Loads Dictionaries from the server
   */
  loadData() {
    this.isLoading = true;
    this.dictService.get().subscribe(response => {
      if (response.response.success) {
        this.source.load(response.output).then(() => {
          this.source.setSort([{ field: 'id', direction: 'asc' }]);
          this.applyPreferences();
          this.isLoading = false;
        });
      } else {
        this.errorHelper.processedButFailed(response);
      }
    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;

      switch (error.name || error.type) {
        case 'NO_DICTIONARYS_FOUND': { this.source.load([]).then(() => { this.isLoading = false; }); break; }
        default: { this.errorHelper.handleGenericError(err); break; }
      }
    });
  }

  /**
   * @description Handler for onAdd event
   */
  onAdd(): void {
    this.isSearch = false;
    this.isModalOpen = true;
    const modal = this.modalService.open(CreateDictionaryComponent, defaultModalOptions());

    modal.result.then((re: boolean) => {
      if (re) this.refresh();
      this.isModalOpen = false;
    });
  }

  /**
   * @description Handler for onEdit event
   * @param event
   */
  onEdit(event: any): void {
    this.isSearch = false;
    this.isModalOpen = true;
    const modal = this.modalService.open(EditDictionaryComponent, defaultModalOptions({ size: 'lg' }));

    modal.componentInstance.dictionary = event.data;
    modal.result.then((re: boolean) => {
      if (re) this.refresh();
      this.isModalOpen = false;
    });
  }

  /**
   * @description Handler for onDelete event
   * @param event
   */
  // TODO: What the fuck. Why does this now throw ExpressionChangedAfterItHasBeenCheckedError ????
  onDelete(event: any): void {
    // this.isModalOpen = true;
    // const modal = this.modalService.open(DefaultModalComponent, defaultModalOptions());
    //
    // modal.componentInstance.modalHeader = translate('DELETE_CONFIRM_TITLE');
    // modal.componentInstance.modalContent = translate('DELETE_CONFIRM_MSG');
    // modal.componentInstance.modalButtons = [
    //   {
    //     text: translate('CANCEL'),
    //     classes: 'btn-secondary',
    //     action: () => { modal.close(false); },
    //   },
    //   {
    //     text: translate('DELETE'),
    //     classes: 'btn-danger',
    //     action: () => { this.delete(event.data, modal); },
    //   },
    // ];
    // modal.result.then((re: boolean) => {
    //   if (re) this.refresh();
    //   this.isModalOpen = false;
    // });
  }

  /**
   * @description Removes a Dictionary
   * @param {IDict} dict
   * @param modal
   */
  delete(dict: IDict, modal: any): void {
    this.dictService.delete(dict.id).subscribe(response => {
      if (response.response.success) {
        this.toaster.popAsync('info', translate('DELETE_SUCCESS_TITLE'), translate('DELETE_SUCCESS_MSG'));
        modal.close(true);
      } else {
        this.errorHelper.processedButFailed(response);
        modal.close(false);
      }
    }, error => {
      this.errorHelper.handleGenericError(error);
      modal.close(false);
    });
  }

}
