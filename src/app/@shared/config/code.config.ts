import { findByProp } from '../helpers';
import { IResponse } from '../models';

let RESPONSE_CODES: { [key: string]: IResponse | any } = {};

/**
 * @description Updates the RESPONSE_CODES set
 * @param input
 */
export function updateCodes(input: { [key: string]: IResponse | any }): void {
  RESPONSE_CODES = input;
}

/**
 * @description Returns a code of a <service> by its <name>
 * @param name
 * @param service
 */
export function getCodeByName(name: string, service: string): IResponse {
  let result: IResponse;
  if (RESPONSE_CODES !== {} && !!RESPONSE_CODES[service]) {
    result = findByProp(RESPONSE_CODES[service], 'name', name);
  } else {
    result = {
      name: 'UNDEFINED_ERROR',
      message: 'Undefined error occurred',
      status: 500,
      success: false,
    };
  }
  return result;
}
