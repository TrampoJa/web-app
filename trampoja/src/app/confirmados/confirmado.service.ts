import { Injectable } from '@angular/core';
import { AppService} from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { Confirmado } from './confirmado';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class ConfirmadoService {
  private handleError: HandleError;
  body = {};

  constructor(
    private service: AppService,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) { this.handleError = httpErrorHandler.createHandleError('ConfirmadoService'); }

  listF(): Observable<Confirmado[]> {
    return this.service.http.get<Confirmado[]>
      (this.service.appRoot.concat("f_confirmados/"))
      .pipe(
        catchError(this.handleError('listConfirmados', [])
      )
    );
  }

  listE(): Observable<Confirmado[]> {
    return this.service.http.get<Confirmado[]>
      (this.service.appRoot.concat("e_confirmados/"))
      .pipe(
        catchError(this.handleError('listConfirmados', [])
      ) 
    );
  }

  create(id_oferta: number | string, id_freelancer: number | string): Observable<Confirmado> {
    let res;
    this.body = {
      freelancer: id_freelancer,
      oferta: id_oferta
    };
    return this.service.http.post<Confirmado>
      (this.service.appRoot.concat('confirmado'), this.body)
      .pipe(
        tap(response => res = response),
        finalize(() => {
          if (res) {
            this.router.navigate(['/confirmados']);
            alert("Trampo confirmado com sucesso!");
          }
        }),
        catchError(this.handleError<Confirmado>('createConfirmado')
      )
    );
  }
}