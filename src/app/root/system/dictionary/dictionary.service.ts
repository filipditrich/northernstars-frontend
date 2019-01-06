import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { getUrl } from '../../../@shared/config';
import { IResource } from '../../../@shared/models';
import { IDict } from '../../../@shared/models';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  /**
   * @description Request for Group creation
   * @param input
   * @return {Observable<IResource>}
   */
  create(input: IDict): Observable<IResource> {
    return this.http.post<IResource>(getUrl('operator', 'ADD_DICT'), { input });
  }

  /**
   * @description Request for Group update
   * @param {string} id
   * @param {any} input
   * @return {Observable<IResource>}
   */
  update(id: string, input: any): Observable<IResource> {
    return this.http.put<IResource>(`${getUrl('operator', 'UPD_DICT')}/${id}`, { input } );
  }

  /**
   * @description Request for Group delete
   * @param {string} id
   * @return {Observable<IResource>}
   */
  delete(id: string): Observable<IResource> {
    return this.http.delete<IResource>(`${getUrl('operator', 'DEL_DICT')}/${id}`);
  }

  /**
   * @description Request for Group obtain
   * @param {string} id
   * @return {Observable<IResource>}
   */
  get(id?: string): Observable<IResource> {
    return this.http.get<IResource>(`${getUrl('operator', 'GET_DICT')}/${id || ''}`);
  }

}
