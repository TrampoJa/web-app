import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { Oferta } from './oferta';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class OfertaService {
    private handleError: HandleError;
    
    constructor(
        private service: AppService,
        private router: Router,
        httpErrorHandler: HttpErrorHandler  
    ) { this.handleError = httpErrorHandler.createHandleError('OfertaService'); }

    list(): Observable<Oferta[]> {
        return this.service.http.get<Oferta[]>
            (this.service.appRoot.concat("ofertas/liste"))
            .pipe(
                catchError(this.handleError('listOfertas', [])
            )
        );
    }

    profile(): Observable<Oferta[]> {
        return this.service.http.get<Oferta[]>
            (this.service.appRoot.concat("ofertas/profile"))
            .pipe(
                catchError(this.handleError('profileOfertas', [])
            )
        );
    }

    create(oferta: any): Observable<Oferta> {
        let res;
        return this.service.http.post<Oferta>
            (this.service.appRoot.concat('ofertas/create'), oferta)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        this.router.navigate(['/meus-trampos']);
                        alert("Trampo criado com sucesso!");
                    }   
                }),
                catchError(this.handleError<Oferta>('createOfertas')
            )
        );
    }

    detail(id: string | number): Observable<Oferta> {
        return this.service.http.get<Oferta>
            (this.service.appRoot.concat(`ofertas/detail/${id}`))
            .pipe(
                catchError(this.handleError<Oferta>('detailOfertas')
            )
        );
    }

    update(id: string | number, oferta: Oferta): Observable<Oferta> {
        let res;
        return this.service.http.put<Oferta>
            (this.service.appRoot.concat(`ofertas/update/${id}`), oferta)
            .pipe(
                tap(response => res = response),
                finalize(() => {
                    if (res) {
                        alert("Sucesso!");
                    }   
                }),
                catchError(this.handleError<Oferta>('updateOfertas')
            )
        );
    }

    delete(id: string | number): Observable<Oferta> {
        return this.service.http.delete<Oferta>
            (this.service.appRoot.concat(`ofertas/delete/${id}`))
            .pipe(
                catchError(this.handleError<Oferta>('deleteOfertas')
            )
        );
    }
}