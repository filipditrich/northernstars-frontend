import { listSysInfo } from '../config';

/**
 * @description Returns ID specific system info
 * @param {string} id
 * @return {string}
 */
export function sysInfo(id: string): string {
  const SYS_INFO = listSysInfo();
  return !SYS_INFO[id] ? id : SYS_INFO[id];
}
