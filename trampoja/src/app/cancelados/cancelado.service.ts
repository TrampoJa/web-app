import { Injectable } from '@angular/core';
import { AppService} from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { Cancelado } from './cancelado';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class CanceladoService {
    private handleError: HandleError;
    body = {};

    constructor (
        private service: AppService,
        httpErrorHandler: HttpErrorHandler
    ) { this.handleError = httpErrorHandler.createHandleError('CanceladoService'); }

    listF(): Observable<Cancelado[]> {
      return this.service.http.get<Cancelado[]>
        (this.service.appRoot.concat("f_cancelados"))
        .pipe(
          catchError(this.handleError('listCancelado', [])
        )
      );
    }

    listE(): Observable<Cancelado[]> {
      return this.service.http.get<Cancelado[]>
        (this.service.appRoot.concat("e_cancelados"))
        .pipe(
          catchError(this.handleError('listCancelado', [])
        )
      );
    }

    create(oferta: number, freelancer: number, confirmado: number, justificativa: string): Observable<Cancelado> {
        let res;
        this.body = {
          'oferta': oferta,
          'freelancer': freelancer,
          'confirmado': confirmado,
          'justificativa': justificativa
        }
        return this.service.http.post<Cancelado>
          (this.service.appRoot.concat('cancelar'), this.body)
          .pipe(
            tap(response => res = response),
            finalize(() => {
              if (res) {
                alert("Trampo cancelado com sucesso!");
              }
            }),
            catchError(this.handleError<Cancelado>('createCancelado')
          )
        );
    }
}