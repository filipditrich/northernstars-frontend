import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {getUrl} from '../config';
import {IResource} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /**
   * @description Request to obtain list of users or an <ID≥ specific user
   * @param {string} id
   * @param {boolean} showAll
   */
  get(id?: string, showAll?: boolean): Observable<IResource> {
    const pq = id ? `/${id}` : showAll ? '?show-all=true' : '';
    return this.http.get<IResource>(`${getUrl('operator', 'GET_USER')}${pq}`);
  }

}
