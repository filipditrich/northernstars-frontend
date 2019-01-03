import { IDefault, ITimestamp } from './general.model';

/**
 * Jersey Interface
 */
export interface IJersey extends IDefault, ITimestamp {
  name: string;
}
