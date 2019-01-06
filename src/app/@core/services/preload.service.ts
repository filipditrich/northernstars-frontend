import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IResource } from '../../@shared/models';
import { updateSysInfo, updateTranslateList, updateEndpoints, updateCodes } from '../../@shared/config';

@Injectable({
  providedIn: 'root',
})
export class PreloadInitializer {

  constructor(private http: HttpClient) { }

  startupConfig(): Promise<any> {
    return this.serverAssets();
  }

  serverAssets(): Promise<any> {

    const headers = new HttpHeaders()
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');

    return this.http.get<IResource>(`${environment.api}/api/sys/assets`, { headers })
      .toPromise()
      .then(result => {
        if (result.output) {
          updateCodes(result.output['codes']);
          updateEndpoints(result.output['routes']);
          updateTranslateList(result.output['translateList']);
          updateSysInfo(result.output['sysInfo']);
        } else {
          console.error('[PRELOAD] Error: No server assets available!', result);
        }
      }, error => {
        console.error('[PRELOAD] Error: Error occurred while receiving server assets!', error);
      });

  }

}
