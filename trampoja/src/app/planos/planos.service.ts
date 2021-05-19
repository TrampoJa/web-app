import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { Plano } from './plano';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class PlanoService {
    private handleError: HandleError;
    
    constructor(
        private service: AppService,
        httpErrorHandler: HttpErrorHandler  
    ) { this.handleError = httpErrorHandler.createHandleError('PlanoService'); }

    list(): Observable<Plano[]> {
        return this.service.http.get<Plano[]>
            (this.service.appRoot.concat("planos/liste"))
            .pipe(
                catchError(this.handleError('listPlanos', [])
            )
        );
    }

    profile(): Observable<Plano[]> {
        return this.service.http.get<Plano[]>
            (this.service.appRoot.concat("planos/profile"))
            .pipe(
                catchError(this.handleError('profilePlano', [])
            )
        );
    }

    setPlanoEstabelecimento(plano: number, estabelecimento: number): Observable<Plano> {
        let res;
        let body = {
            estabelecimento: estabelecimento,
            plano: plano
        }
        return this.service.http.post<Plano>
            (this.service.appRoot.concat('planos/set'), body)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        alert("Plano adquirido com sucesso!");
                    }   
                }),
                catchError(this.handleError<Plano>('createPlano')
            )
        );
    }
}