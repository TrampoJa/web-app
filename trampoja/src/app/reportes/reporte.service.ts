import { Injectable } from "@angular/core";
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { AppService } from "../app.service";
import { catchError } from 'rxjs/operators';

import { Reporte } from "./reporte";
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class ReporteService {
    private handleError: HandleError;
    body = {};

    constructor(
        private service: AppService,
        httpErrorHandler: HttpErrorHandler,
    ) {
        this.handleError = httpErrorHandler.createHandleError("ReporteService");
    }

    reportar(freelancer: number, oferta: number, descricao: string, motivos: {}): Observable<Reporte> {
        let res;
        this.body = {
          'freelancer': freelancer,
          'oferta': oferta,
          'descricao': descricao,
          'motivos': motivos,
        }
        return this.service.http.post<Reporte>
          (this.service.appRoot.concat('reportar'), this.body)
          .pipe(
            tap(response => res = response),
            finalize(() => {
              if (res) {
                alert("Freelancer reportado com sucesso!");
              }
            }),
            catchError(this.handleError<Reporte>('createReporte')
          )
        );
    }

    reportes(freelancer: number | string): Observable<Reporte[]> {
      return this.service.http.get<Reporte[]>
          (this.service.appRoot.concat(`reportes/${freelancer}`))
          .pipe(
            catchError(this.handleError<Reporte[]>('Reportes')
          )
        );
    }
}