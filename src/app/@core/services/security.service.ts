import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IUser} from '../../@shared/models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  /**
   * @description Stores logged in User data
   * @param user
   * @param token
   */
  static storeUserData(user: IUser, token: string): void {
    localStorage.setItem('user', JSON.stringify({ user, token }));
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

}