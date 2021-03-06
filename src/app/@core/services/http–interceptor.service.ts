import { Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(HttpHeadersInterceptor.handleRequest(req, next));
  }

  private static async handleRequest(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    // Modify incoming request
    let newHeaders = new HttpHeaders();

    // Preserve originally passed headers
    for (const key of req.headers.keys()) { newHeaders = newHeaders.set(key, req.headers.getAll(key)); }

    // Inject an User Token
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : false;

    // Append additional headers
    newHeaders = newHeaders.set('Content-Type', 'application/json');
    newHeaders = newHeaders.set('Authorization', token);
    newHeaders = newHeaders.set('Application-ID', '6e6f7274-6865-726e-7374-6172732e637a');

    const modifiedReq = req.clone({ headers: newHeaders });

    // Send out modified request
    return next.handle(modifiedReq).toPromise();

  }

}

