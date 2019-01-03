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
 * Check Type Enums - for Guards
 */
export enum CheckType {
  Registration,
  PasswordReset,
}
