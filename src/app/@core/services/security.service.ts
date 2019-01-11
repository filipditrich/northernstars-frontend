import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IUser, UserRoles} from '../../@shared/models';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  /**
   * @description Stores logged in User data
   * @param user
   * @param token
   * @param rememberMe
   */
  static storeUserData(user: IUser, token: string, rememberMe: boolean): void {
    user['token'] = token;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('rememberMe', String(rememberMe));
  }

  /**
   * @description Extracts the user object from saved data
   */
  static getUser(): IUser {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * @description Returns If the token (<t> or stored) is valid
   */
  static isTokenValid(t?: string): boolean {
    const token: string = t || SecurityService.getToken();
    return token ? !new JwtHelperService().isTokenExpired(token) : false;
  }

  /**
   * @description Extracts the token from saved user data
   */
  static getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
  }

  /**
   * @description Removes user login saved data
   */
  static logOut(): void {
    localStorage.removeItem('user');
  }

  /**
   * @description Returns if the <user> or logged-in user has Admin role
   * @param user
   * @returns {boolean}
   */
  static isAdmin(user?: IUser): boolean {
    const u = user || JSON.parse(localStorage.getItem('user'));
    return u.roles.indexOf(UserRoles.Admin) >= 0;
  }

  /**
   * @description Returns if the <user> or logged-in user has Super role
   * @param user
   * @returns {boolean}
   */
  static isSuper(user?: IUser): boolean {
    const u = user || JSON.parse(localStorage.getItem('user'));
    return u.roles.indexOf(UserRoles.Super) >= 0;
  }

}
