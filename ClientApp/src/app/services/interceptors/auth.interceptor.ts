import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../common/token.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.tokenService.token;
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        return next.handle(clonedRequest);
    }
  }