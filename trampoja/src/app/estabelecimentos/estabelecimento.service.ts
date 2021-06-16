import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { UserService } from '../users/user.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { Estabelecimento } from './estabelecimento';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class EstabelecimentoService {
  private handleError: HandleError;

  constructor(
    private service: AppService,
    private userService: UserService,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) { this.handleError = httpErrorHandler.createHandleError('EstabelecimentoService'); }

  list(): Observable<Estabelecimento[]> {
    return this.service.http.get<Estabelecimento[]>
      (this.service.appRoot.concat("estabelecimento/liste"))
      .pipe(
        catchError(this.handleError('listEstabelecimentos', [])
      )
    );
  }

  profile(): Observable<Estabelecimento> {
    return this.service.http.get<Estabelecimento>
      (this.service.appRoot.concat("estabelecimento/profile"))
      .pipe(
        catchError(this.handleError<Estabelecimento>('profileEstabelecimento')
      )
    );
  }

  create(estabelecimento: any): Observable<Estabelecimento> {
    let res;
    return this.service.http.post<Estabelecimento>
      (this.service.appRoot.concat('estabelecimento/create'), estabelecimento)
      .pipe(
        tap(response => res = response),
        finalize(() => {
            if (res) {
                localStorage.setItem('GROUP', JSON.stringify({group: res[1] ['last_name']}));
                while (!this.userService.groupValue) {
                  this.userService.groupSubject.next(res[1] ['last_name']);
                }
                this.router.navigate(['/planos']);
                alert("Tudo certo com seu cadastro");
            }   
        }),
        catchError(this.handleError<Estabelecimento>('createFreelancer')
      )
    );
  }

  detail(id: number | string): Observable<Estabelecimento> {
    return this.service.http.get<Estabelecimento>
      (this.service.appRoot.concat(`estabelecimento/detail/${id}`))
      .pipe(
        catchError(this.handleError<Estabelecimento>('detailEstabelecimento')
      )
    );
  }

  update(id: string | number, estabelecimento: Estabelecimento): Observable<Estabelecimento> {
    let res;
    return this.service.http.put<Estabelecimento>
      (this.service.appRoot.concat(`estabelecimento/update/${id}`), estabelecimento)
      .pipe(
        tap(response => res = response),
        finalize(() => {
            if(res) {
            alert("Sucesso");
          }
        }),
        catchError(this.handleError<Estabelecimento>('updateEstabelecimento')
      )
    );
  }

  upload(id: number | string, logo: any): Observable<Estabelecimento> {
    return this.service.http.post<Estabelecimento>
      (this.service.appRoot.concat(`estabelecimento/upload/${id}`), logo)
      .pipe(
        catchError(this.handleError<Estabelecimento>('uploadLogo')
      )
    );
  }
}