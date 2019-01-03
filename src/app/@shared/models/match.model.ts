import { IDefault, ITimestamp } from './general.model';
import { IPlace } from './place.model';
import { IGroup } from './group.model';
import { IUser } from './user.model';
import { IJersey } from './jersey.model';

/**
 * Match Interface
 */
// TODO: constructor(init?: Partial<T>) { Object.assign(this, init) } ??
export interface IMatch extends IDefault, ITimestamp {
  title: string;
  date: Date;
  place: IPlace | string;
  group: IGroup | string;
  note?: string;
  enrollment: {
    enrollmentOpens: Date;
    enrollmentCloses: Date;
    maxCapacity: number;
    players: IEnrollmentPlayer[];
  };
  results?: IMatchResult;
}

/**
 * Enrollment Player Interface
 */
export interface IEnrollmentPlayer {
  player: IUser | string;
  enrolledOn: Date;
  status: EnrollmentStatus;
  info?: IUser;
}

/**
 * Enrollment Status enum
 */
export enum EnrollmentStatus {
  Going = 'going',
  Skipping = 'skipping',
}
export namespace EnrollmentStatus {
  export function values() {
    return Object.keys(EnrollmentStatus).filter((type) => isNaN(<any>type) && type !== 'values');
  }
}

/**
 * Match Result Interface
 */
export interface IMatchResult extends IDefault, ITimestamp {
  match: string;
  players: IMatchResultPlayer[];
}

/**
 * Match Result Player Interface
 */
export interface IMatchResultPlayer extends IDefault {
  goals?: number;
  player: IUser | string;
  jersey: IJersey | string;
  status: MatchResult;
}

/**
 * Match Result Enum
 */
export enum MatchResult {
  Win = 'win',
  Loose = 'loose',
  Draft = 'draft',
}
export namespace MatchResult {
  export function values() {
    return Object.keys(MatchResult).filter((type) => isNaN(<any>type) && type !== 'values');
  }
}
