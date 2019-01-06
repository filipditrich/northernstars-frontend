import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultTableComponent } from '../../../@shared/components';
import { ErrorHelper, HumanizerHelper, translate } from '../../../@shared/helpers';
import { LocalDataSource } from 'ng2-smart-table-extended';
import { DictionaryService } from './dictionary.service';

@Component({
  selector: 'ngx-system-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent extends DefaultTableComponent implements OnInit {

  constructor(errorHelper: ErrorHelper,
              modalService: NgbModal,
              private humanizer: HumanizerHelper,
              private dictService: DictionaryService) {

    super(errorHelper, modalService);

    this.storagePrefName = 'dictionary';
    this.source = new LocalDataSource();
    this.filterOptions = {
      rowsPerPage: {
        value: 10,
        id: 'rowsPerPage',
        title: translate('ROWS_PER_PAGE'),
        type: 'select',
        options: {
          items: [
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '25', value: 25 },
            { label: '50', value: 50 },
          ],
        },
      },
    };
    this.settings = {
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
      rowClassFunction: row => '',
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
          if (value.length > 24) { value = value.substring(32, 0) + '...'; }
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
          if (value.length > 32) { value = value.substring(32, 0) + '...'; }
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
        title: translate('UPDATED_BY'),
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
    this.loadPreferences();
    this.loadData();
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

}
