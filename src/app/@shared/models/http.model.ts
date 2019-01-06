import { UserRoles } from './user.model';

/**
 * Response Interface
 */
export interface IResponse {
  name: string;
  message?: string;
  status: number;
  success: boolean;
}

/**
 * Resource Interface - Output of all API calls
 */
export interface IResource {
  response: IResponse;
  output?: any | any[];
}

/**
 * Endpoint Interface
 */
export interface IEndpoint {
  id: string;
  method: EndpointMethod;
  params: string[];
  roles: UserRoles[];
  url: string;
}

/**
 * Endpoint Method Enums
 */
export enum EndpointMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

/**
 * Check Type Enums - for Guards
 */
export enum CheckType {
  Registration,
  PasswordReset,
}
