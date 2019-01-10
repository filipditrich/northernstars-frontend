import { HostListener } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table-extended';
import { IFilterOptions } from '../../models/table.model';
import { DefaultModalComponent } from '../modals/default-modal.component';
import { TablePreferencesComponent } from './table-preferences/table-preferences.component';
import { translate, ErrorHelper } from '../../helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Default table component
 * @author filipditrich
 */
export class DefaultTableComponent {

  public isLoading: boolean = true;
  public isModalOpen: boolean = false;

  public autoRefresh: boolean = false;
  public allowBackgroundRefresh: boolean = false;
  public isTabActive: boolean = true;
  public refreshTimeout: number = 60000;

  public storagePrefName: string = 'defaultTable';
  public source: LocalDataSource;

  @HostListener('window:focus') onFocus(): void { this.isTabActive = true; }
  @HostListener('window:blur') onBlur(): void { this.isTabActive = false; }

  constructor(public errorHelper: ErrorHelper,
              public modalService: NgbModal) {

  }

  /**
   * @description Table Settings
   */
  public settings: any = {};

  /**
   * @description Filter Columns
   */
  public filters: any[] = [];

  /**
   * @description Optional filters
   */
  public filterOptions: IFilterOptions = {};

  /**
   * @description Initializes the core functions
   */
  init(): void {
    this.loadData();
    this.loadPreferences();
    this.refreshInterval();

    // assign the value for autoRefresh if present
    if (this.filterOptions.autoRefresh) {
      this.autoRefresh = this.filterOptions.autoRefresh.value;
    }

    // assign the value for allowBackgroundRefresh if present
    if (this.filterOptions.backgroundRefresh) {
      this.allowBackgroundRefresh = this.filterOptions.backgroundRefresh.value;
    }
  }

  /**
   * @description Loads data
   */
  loadData(): void {}

  /**
   * @description Stores preferences from 'input' or localStore based on the 'input' presence
   * @param input
   */
  loadPreferences(input?: any): void {
    const preferences = !!input ? input : JSON.parse(localStorage.getItem('tablePref')) ? JSON.parse(localStorage.getItem('tablePref'))[this.storagePrefName] : false;

    if (preferences) {

      // assign the new values
      this.filterOptions = Object.keys(this.filterOptions).length !== Object.keys(preferences.filterOptions).length ?
        this.filterOptions : preferences.filterOptions;

      if (Object.keys(preferences.filters).length === Object.keys(this.filters).length) {
        preferences.filters.forEach(filter => {
          const filterIndex = this.filters.findIndex(obj => obj.id === filter.id);
          this.filters[filterIndex].order = filter.order;
          this.filters[filterIndex].checked = filter.checked;
        });
      }

    }

  }

  /**
   * @description Applies currently stored preferences
   */
  applyPreferences(): void {
    // update the settings
    const upd = this.settings;
    upd.pager.perPage = this.filterOptions.rowsPerPage.value;
    this.settings = Object.assign({}, upd);
    this.source.setPaging(this.source.getPaging().page, this.settings.pager.perPage);

    // add active filters
    this.filters.filter(filter => filter.checked).forEach(filter => {
      this.addFilter(filter.id);
    });

    // remove inactive filters
    this.filters.filter(filter => !filter.checked).forEach(filter => {
      this.removeFilter(filter.id);
    });

    if (this.filters.filter(filter => filter.checked).length === 0) {
      if (!JSON.parse(localStorage.getItem('tablePref')) || !JSON.parse(localStorage.getItem('tablePref'))[this.storagePrefName]) {
        // no tablePreferences stored, apply default filters
        this.applyDefaults();
      } else {
        // user unchecked all filters intentionally
        const modal = this.modalService.open(DefaultModalComponent, {
          container: 'nb-layout',
          keyboard: false,
          backdrop: 'static',
        });

        modal.componentInstance.modalHeader = translate('UNCHECK_ALL_FILTERS_TITLE');
        modal.componentInstance.modalContent = translate('UNCHECK_ALL_FILTERS_MSG');
        modal.componentInstance.modalButtons = [
          {
            text: translate('SET_DEFAULT'),
            classes: 'btn btn-primary',
            action: () => { this.applyDefaults(); modal.close(); },
          },
          {
            text: translate('CONTINUE'),
            classes: 'btn btn-secondary',
            action: () => modal.close(),
          },
        ];
      }
    }
  }

  /**
   * @description Adds Filter Column to the Table
   * @param filterId
   */
  addFilter(filterId): void {
    const upd = this.settings;
    const objIndex = this.filters.findIndex((obj => obj.id === filterId));
    const filter = this.filters[objIndex];
    filter.checked = true;
    const formatted = {};
    upd.columns[filter.id] = filter;
    const array = Object.keys(upd.columns).map(i => upd.columns[i]);
    const sorted = array.sort((a, b) =>  a.order - b.order );
    sorted.forEach(obj => { formatted[obj.id] = obj; });
    upd.columns = formatted;
    this.settings = Object.assign({}, upd);
  }

  /**
   * @description Removes Filter Column from the Table
   * @param filterId
   */
  removeFilter(filterId): void {
    const upd = this.settings;
    const objIndex = this.filters.findIndex((obj => obj.id === filterId));
    const filter = this.filters[objIndex];
    filter.checked = false;
    delete upd.columns[filter.id];
    this.settings = Object.assign({}, upd);
  }

  /**
   * @description Opens columnPreferences modal window
   */
  openPreferences(): void {
    this.isModalOpen = true;
    // create the modal instance
    const modal = this.modalService.open(TablePreferencesComponent, {
      container: 'nb-layout',
      keyboard: false,
      backdrop: 'static',
    });

    // pass the current filters into the modal component
    modal.componentInstance.filters = this.filters;
    modal.componentInstance.filterOptions = this.filterOptions;
    modal.componentInstance.storagePrefName = this.storagePrefName;

    // modify filters
    modal.result.then(output => {
      if (output) {
        // update the settings
        this.loadPreferences(output);
        // reload the data
        this.loadData();
      }
      this.isModalOpen = false;
    }, error => null);
  }

  /**
   * @description Applies default filter columns
   */
  applyDefaults(): void {
    this.filters.filter(filter => filter.default).forEach(filter => {
      this.addFilter(filter.id);
    });
  }

  /**
   * @description Refresh function
   */
  refresh(): void {
    this.loadData();
  }

  /**
   * @description Sets an Interval for data refresh
   */
  refreshInterval(): void {
    setInterval(() => {
      if (this.autoRefresh && !this.isModalOpen && (this.allowBackgroundRefresh || this.isTabActive)) {
        this.loadData();
      }
    }, this.refreshTimeout);
  }

}
