import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { UserService } from '../users/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  auth: string;

  constructor(
    private service: UserService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.service.tokenValue;
    if (token) {
      this.auth = token.token
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Token ' + this.auth
        })
      };
      const authReq = req.clone(httpOptions);
      return next.handle(authReq);
    };
    return next.handle(req);
  }
}
