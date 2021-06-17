import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { User } from './user';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { sleep } from '../../assets/js/sleep';

@Injectable()
export class UserService {
    private user: User;
    private handleError: HandleError;
    private tokenSubject: BehaviorSubject<User>;
    public ownerSubject: BehaviorSubject<User>;
    public groupSubject: BehaviorSubject<User>;
    private recoverySubject: BehaviorSubject<any>;
    public group: Observable<User>;

    constructor(
        private service: AppService,
        private router: Router,
        httpErrorHandler: HttpErrorHandler
    ) { 
        this.handleError = httpErrorHandler.createHandleError('UserService');
        this.tokenSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('TOKEN')));
        this.ownerSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('OWNER')));
        this.groupSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('GROUP')));
        this.recoverySubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('RPSWD')));
        this.group = this.groupSubject.asObservable();
        this.user = new User()
      }

    public get tokenValue(): User {
        return this.tokenSubject.value;
    }

    public get ownerValue() {
        return this.ownerSubject.value;
    }

    public get groupValue(): User {
        return this.groupSubject.value;
    }

    public get recoveryValue() {
        return this.recoverySubject.value;
    }

    create(user: any): Observable<User> {
        let res;
        return this.service.http.post<User>
            (this.service.appRoot.concat('auth/register'), user)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        this.router.navigate(['/login']);
                        alert("Cadastro realizado com sucesso!");
                    }
                }),
                catchError(this.handleError<User>('createUser')
            )
        );
    }

    profile(): Observable<User> {
        return this.service.http.get<User>
            (this.service.appRoot.concat("auth/profile"))
            .pipe(
                catchError(this.handleError<User>('profileUser')
            )
        );
    }

    update_email(email: any): Observable<User> {
        let res;
        return this.service.http.put<User>
            (this.service.appRoot.concat('auth/set-email'), email)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        alert("Email atualizado com sucesso!");
                    }       
                }),
                catchError(this.handleError<User>('updateEmailUser')
            )
        );
    }

    update_password(password: any): Observable<User> {
        let res;
        return this.service.http.put<User>
            (this.service.appRoot.concat('auth/set-password'), password)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        localStorage.removeItem('RPSWD');
                        this.tokenSubject.next(null);
                        alert("Senha atualizada com sucesso!");
                        sleep(1200);
                        this.logout();
                    }       
                }),
                catchError(this.handleError<User>('updatePasswordUser')
            )
        );
    }

    login(user: any): Observable<User> {
        let res;
        return this.service.http.post<User>
            (this.service.appRoot.concat('login/'), user)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        localStorage.setItem('OWNER', JSON.stringify({owner: res['id']}));
                        localStorage.setItem('GROUP', JSON.stringify({group: res['last_name']}));
                        this.ownerSubject.next(res['id'])
                        this.groupSubject.next(res['last_name'])
                        if (res['last_name'] == "Freelancer") {
                            this.router.navigate(['/trampos']);
                        }
                        else if (res['last_name'] == "Estabelecimento") {
                            this.router.navigate(['/meus-trampos']);
                        }
                        else {
                            this.router.navigate(['/']);
                        }

                        return user;
                    }   
                }),
                catchError(this.handleError<User>('loginUser')
            )
        );
    }

    logout(): void {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('OWNER');
        localStorage.removeItem('GROUP');
        this.tokenSubject.next(null);
        this.ownerSubject.next(null);
        this.groupSubject.next(null);
        this.router.navigate(['login/']);
        location.reload();
        return;
    }

    recovery(email: any) {
        let res;
        return this.service.http.post
            (this.service.appRoot.concat("auth/recovery-pswd"), email)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        localStorage.setItem('RPSWD', JSON.stringify({'rpswd':'s'}));
                        while (!this.recoveryValue) {
                            this.recoverySubject.next({'rpswd':'s'});
                        }
                        this.router.navigate(['login/']);
                        alert("Tudo certo, confira no email sua senha provisória!");
                    }
                    else {
                        this.router.navigate(['recuperacao-senha/']);
                    } 
                }),
                catchError(this.handleError('RecoveryPassword')
            )
        );
    }

    token(user: any): Observable<User> {
        let res;
        return this.service.http.post<User>
            (this.service.appRoot.concat('token/'), user)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        localStorage.setItem('TOKEN', JSON.stringify(res));
                        while (!this.tokenValue) {
                            this.tokenSubject.next(res);
                        }
                    }   
                }),
                catchError(this.handleError<User>('tokenUser')
            )
        );
    }

    refreshToken(user: any): Observable<User> {
        let res;
        return this.service.http.post<User>
            (this.service.appRoot.concat('refresh-token/'), user)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) { 
                        localStorage.setItem('TOKEN', JSON.stringify(res));
                        this.tokenSubject.next(res);
                    }   
                }),
                catchError(this.handleError<User>('tokenUser')
            )
        );
    }

    setFreelancerNoGroup(): void {
        this.user.group="noGroupFreelancer"
        localStorage.setItem('GROUP', JSON.stringify({group: 'noGroupFreelancer'}));
        while (this.groupValue.group === "") {
            this.groupSubject.next(this.user);
        }
    }

    setEstabelecimentoNoGroup(): void {
        this.user.group="noGroupEstabelecimento"
        localStorage.setItem('GROUP', JSON.stringify({group: 'noGroupEstabelecimento'}));
        while (this.groupValue.group === "") {
            this.groupSubject.next(this.user);
        }
    }
}