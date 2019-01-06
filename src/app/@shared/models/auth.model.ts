/**
 * Login Request Interface
 */
export interface ILoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Register Request Interface
 */
export interface IRegisterRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  team: string;
}

/**
 * Registration Request Interface
 */
export interface IRegistrationRequest {
  name: string;
  email: string;
}
