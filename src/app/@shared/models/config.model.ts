import { IDefault, ITimestamp } from './general.model';

/**
 * TranslateList Interface
 */

export interface ITranslateList {
  [key: string]: ITranslateDict;
}

/**
 * TranslateList Dictionary Interface
 */
export interface ITranslateDict {
  cs: string;
  en: string;
}

/**
 * Dictionary Interface
 */
export interface IDict extends IDefault, ITimestamp {
  id: string;
  cs: string;
  en: string;
}

/**
 * SysInfo list Interface
 */
export interface ISysInfoList {
  [key: string]: string;
}
