import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from '../users/user.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor(
        private service: UserService,
        private router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.service.tokenValue;
        console.log(location.pathname);
        if (!token) {
            if (location.pathname == '/register')
                this.router.navigate(['register/'])
            else
                this.router.navigate(['login/']);
        }
        return next.handle(req);
    }
}
