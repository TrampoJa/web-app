import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { UserService } from '../users/user.service';
import { Router } from '@angular/router';

@Injectable()
export class RecoveryInterceptor implements HttpInterceptor {

  constructor(
    private service: UserService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const recovery = this.service.recoveryValue;
        if (recovery) {
            this.router.navigate(['configuracoes/']);
        }
        return next.handle(req);
  }
}
