import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import {getUrl} from '../../@shared/config';
import {IRegisterRequest, IRegistrationRequest, IResetInput, IResetRequest, IResource} from '../../@shared/models';
import {ILoginRequest} from '../../@shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * @description Login request
   * @param credentials
   * @return {Observable<IResource>}
   */
  logInRequest(credentials: ILoginRequest): Observable<IResource> {
    // TODO: { input } instead of credentials (backend)
    return this.http.post<IResource>(getUrl('operator', 'LOGIN'), credentials);
  }

  /**
   * @description Returns list of available Teams to register in
   * @return {Observable<IResource>}
   */
  getRegistrationTeams(): Observable<IResource> {
    return this.http.get<IResource>(getUrl('operator', 'GET_REG_TEAMS'));
  }

  /**
   * @description Gets a Registration Request
   * @param {string} hash
   * @return {Observable<IResource>}
   */
  getRegistrationRequest(hash: string): Observable<IResource> {
    return this.http.get<IResource>(`${getUrl('operator', 'REG_REQ_GET')}/${hash}`);
  }

  /**
   * @description Finishes Registration Request and registers a new user
   * @param {string} hash
   * @param {IRegisterRequest} input
   * @return {Observable<IResource>}
   */
  registerUser(hash: string, input: IRegisterRequest): Observable<IResource> {
    return this.http.post<IResource>(`${getUrl('operator', 'REG')}/${hash}`, { input });
  }

  /**
   * @description Registration Request
   * @param {IRegistrationRequest} input
   * @return {Observable<IResource>}
   */
  requestRegistration(input: IRegistrationRequest): Observable<IResource> {
    return this.http.post<IResource>(getUrl('operator', 'REG_REQ'), { input });
  }

  /**
   * @description Password Reset Request check
   * @param {string} hash
   * @return {Observable<IResource>}
   */
  checkPasswordResetRequest(hash: string): Observable<IResource> {
    const input = { hash: hash };
    return this.http.post<IResource>(`${getUrl( 'operator', 'EXIST_CHECK')}/password-reset`, { input });
  }

  /**
   * @description Password reset
   * @param {string} hash
   * @param {IResetRequest} input
   * @return {Observable<IResource>}
   */
  createNewPassword(hash: string, input: IResetRequest): Observable<IResource> {
    return this.http.post<IResource>(`${getUrl('operator', 'PWD_RES')}/${hash}`, { input });
  }

  /**
   * @description Password reset request
   * @param {IResetInput} input
   * @return {Observable<IResource>}
   */
  requestPasswordReset(input: IResetInput): Observable<IResource> {
    return this.http.post<IResource>(getUrl( 'operator', 'PWD_FGT'), { input });
  }

  /**
   * @description Username reset request
   * @param {IResetInput} input
   * @return {Observable<IResource>}
   */
  sendUsernameToEmail(input: IResetInput): Observable<IResource> {
    return this.http.post<IResource>(getUrl('operator', 'USN_FGT'), { input });
  }

}
