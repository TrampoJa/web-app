import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { UserService } from '../users/user.service';

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
    auth: string;

    constructor(
        private service: UserService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.service.tokenValue;
        if (token) {
            this.auth = token.token
            if (req.url.match(/upload/)) {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Authorization': 'Token ' + this.auth
                    })
                };
                const authReq = req.clone(httpOptions);
                return next.handle(authReq);
            }
        }
        return next.handle(req);
    }
}
