import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { Interesse } from './interesse';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class InteresseService {
  body = {};
  private handleError: HandleError;
    
  constructor(
    private service: AppService,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) { this.handleError = httpErrorHandler.createHandleError('InteresseService'); }

  listF(): Observable<Interesse[]> {
    return this.service.http.get<Interesse[]>
      (this.service.appRoot.concat("f_interesses/"))
      .pipe(
        catchError(this.handleError('listInteresse', [])
      )
    );
  }

  listE(): Observable<Interesse[]> {
    return this.service.http.get<Interesse[]>
      (this.service.appRoot.concat("e_interesses/"))
      .pipe(
        catchError(this.handleError('listInteresse', [])
      )
    );
  }

  create(id: number | string): Observable<Interesse> {
    let res;
    this.body = {
      'id': id
    };
    return this.service.http.post<Interesse>
      (this.service.appRoot.concat('interesse'), this.body)
      .pipe(
        tap(response => res = response),
        finalize(() => {
          if (res) {
            this.router.navigate(['/interesses']);
            alert("Interesse confirmado com sucesso!");
          }    
        }),
        catchError(this.handleError<Interesse>('createInteresse')
      )
    );
  }
}