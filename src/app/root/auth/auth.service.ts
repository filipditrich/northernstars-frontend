import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import {getUrl} from '../../@shared/config';
import { IResource } from '../../@shared/models';
import {ILoginRequest} from '../../@shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logInRequest(credentials: ILoginRequest): Observable<IResource> {
    return this.http.post<IResource>(getUrl('operator', 'LOGIN'), credentials);
  }

}
