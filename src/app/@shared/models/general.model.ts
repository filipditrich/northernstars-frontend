import { IUser } from './user.model';

/**
 * Timestamp Interface
 */
export interface ITimestamp {
  createdBy?: IUser;
  createdAt?: Date;
  updatedBy?: IUser;
  updatedAt?: Date;
}

/**
 * Default Interface from MongoDB
 */
// TODO: create 'objectId' type (_id: objectId)
export interface IDefault {
  _id: string;
}
