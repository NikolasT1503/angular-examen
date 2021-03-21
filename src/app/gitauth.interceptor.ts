import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const token = 'd6335fe75487e55f1aef6e5ab2989968706a8aa0';

const owner = 'NikolasT1503';

@Injectable()
export class GitauthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const str = 'Basic' + btoa(owner + ':' + token);
    let authRequest = request.clone({
      setHeaders: { 
        Authorization: str 
      },
    });
    console.log('Проверка интерцептора', str);
    return next.handle(authRequest);
  }
}
