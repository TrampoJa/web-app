import { Injectable } from '@angular/core';
import { AppService} from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { Avaliacao } from './avaliacao';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class AvalicaoService {
    avaliacao: Avaliacao;
    body = {};
    private handleError: HandleError;

    constructor(
        private service: AppService,
        private router: Router,
        httpErrorHandler: HttpErrorHandler
      ) { this.handleError = httpErrorHandler.createHandleError('AvaliacaoService'); }


    get(): Observable<any> {
        return this.service.http.get<Avaliacao>
            (this.service.appRoot.concat("avaliacao/get"))
            .pipe(
                catchError(this.handleError('getAvaliacao')
            ) 
        );
    }
      
    
    create(owner: number, oferta: number, nota: number): Observable<Avaliacao> {
        let res;
        this.body = {
            'owner': owner,
            'oferta': oferta,
            'nota': nota
        };
        return this.service.http.post<Avaliacao>
            (this.service.appRoot.concat('avaliacao'), this.body)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        alert('Sucesso');
                    }
                }),
                catchError(this.handleError<Avaliacao>('createAvaliacao')
            )
        );
    }
}