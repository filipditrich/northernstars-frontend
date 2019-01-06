import { ErrorHandler, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }

  handleError(error) {

    // TODO: do some stuff here
    if (environment.production) {
      console.error('ERROR: RELOADING');
      window.location.reload();
    }
    throw error;
  }

}
