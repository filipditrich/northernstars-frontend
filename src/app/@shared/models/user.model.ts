import { IDefault } from './general.model';
import { ITeam } from './team.model';

/**
 * User Interface
 */
export interface IUser extends IDefault {
  name: string;
  username: string;
  email: string;
  roles: UserRoles;
  team: ITeam | string;
  number: number;
}

/**
 * User Roles
 */
export enum UserRoles {
  Admin = 'admin',
  Player = 'player',
  Super = 'super',
  Mod = 'moderator',
  Deleted = 'deleted',
}

/**
 * User Roles values() function
 */
export namespace UserRoles {
  export function values() {
    return Object.keys(UserRoles).filter((type) => isNaN(<any>type) && type !== 'values');
  }
}
