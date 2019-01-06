import { environment } from '../../../environments/environment';
import { findByProp } from '../helpers/general.helper';
import { IEndpoint } from '../models';

let ENDPOINTS: { [key: string]: IEndpoint | any } = {};

/**
 * @description Update the ENDPOINTS set
 * @param input
 */
export function updateEndpoints(input: { [key: string]: IEndpoint }): void {
  ENDPOINTS = input;
}

/**
 * @description Returns an Endpoint of a <service> by its <id>
 * @param id
 * @param service
 */
export function getEndpointById(id: string, service: string): IEndpoint | undefined {
  if (ENDPOINTS[service] !== {}) {
    return findByProp(ENDPOINTS[service], 'id', id);
  } else {
    console.error('[ENDPOINTS] Error: No such a service: "%s"', service);
    return undefined;
  }
}

/**
 * @description Return an url of an Endpoint of a <service> by its <id>
 * @param service
 * @param id
 */
export function getUrlById(service: string, id: string): string | undefined {
  const res = getEndpointById(id, service);
  return res ? res.url : undefined;
}

/**
 * @description Return a formatted url of an Endpoint of a <service> by its <id>
 * @param service
 * @param id
 */
export function getUrl(service: string, id: string): string {
  const endpoint = service === 'operator' ? getUrlById(service, id) : `/${service}${getUrlById(service, id)}`;
  return endpoint === undefined ? `${environment.api}` : `${environment.api}/api${endpoint}`;
}
