import { IDefault, ITimestamp } from './general.model';

/**
 * Place Interface
 */
export interface IPlace extends IDefault, ITimestamp {
  name: string;
}
