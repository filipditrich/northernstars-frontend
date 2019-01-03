import { IDefault, ITimestamp } from './general.model';

/**
 * Group Interface
 */
export interface IGroup extends IDefault, ITimestamp {
  name: string;
}
