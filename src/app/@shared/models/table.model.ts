/**
 * Filter Options Interface
 */
export interface IFilterOptions {
  [key: string]: IFilterOption;
}

/**
 * Filter Option Interface
 */
export interface IFilterOption {
  value: any;
  id: string;
  title: string;
  type: FilterOptionType;
  options?: {
    items?: IFilterOptionOptionsItem[];
    hint?: {
      show: boolean;
      text: string;
    };
  };
}

/**
 * @description Filter Options Item Interface
 */
export interface IFilterOptionOptionsItem {
  label: string;
  value: any;
}

/**
 * Filter Option Type Enums
 */
export enum FilterOptionType {
  Select, Checkbox,
}
