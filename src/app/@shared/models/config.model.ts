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
 * SysInfo list Interface
 */
export interface ISysInfoList {
  [key: string]: string;
}
