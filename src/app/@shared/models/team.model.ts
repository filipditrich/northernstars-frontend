import { IDefault, ITimestamp } from './general.model';

/**
 * Team Interface
 */
export interface ITeam extends IDefault, ITimestamp {
  name: string;
}
