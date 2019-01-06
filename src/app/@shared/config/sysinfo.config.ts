import { ISysInfoList } from '../models/config.model';

/**
 * @description System Information Storage
 * @type {{}}
 */
let SYS_INFO: ISysInfoList = {};

/**
 * @description Updates system info
 * @param update
 */
export function updateSysInfo(update: ISysInfoList): void {
  SYS_INFO = update;
}

/**
 * @description Lists all System Information
 * @return {any}
 */
export function listSysInfo(): ISysInfoList {
  return SYS_INFO;
}
