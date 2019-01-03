/**
 * @description System Information Storage
 * @type {{}}
 */
let SYS_INFO: any = {};

/**
 * @description Updates system info
 * @param update
 */
export function updateSysInfo(update): void {
  SYS_INFO = update;
}

/**
 * @description Lists all System Information
 * @return {any}
 */
export function listSysInfo(): any {
  return SYS_INFO;
}
