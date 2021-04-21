import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from '../users/user.service';

@Injectable()
export class GroupInterceptor implements HttpInterceptor {

    constructor(
        private service: UserService,
        private router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const group = this.service.groupValue;
        if (!group) {
            if (this.is_register()){
                return next.handle(req);
            }
            this.router.navigate(['options/']);
        }
        else if (group.group == ""){
            if (this.is_register()){
                return next.handle(req);
                }
            this.router.navigate(['options/']);
        }
        return next.handle(req);
    }

    is_register(): boolean {
        if (this.router.url === '/novo-freelancer'){
            return true;
        }
        if (this.router.url === '/novo-estabelecimento'){
            return true;
        }
        return false;
    }
}
