import { Injectable } from "@angular/core";
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { AppService } from "../app.service";

import { Reporte } from "./reporte";
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class ReporteService {
    private handleError: HandleError;

    constructor(
        private service: AppService,
        httpErrorHandler: HttpErrorHandler,
    ) {
        this.handleError = httpErrorHandler.createHandleError("ReporteService");
    }

    reportar(freelancer: number): Observable<Reporte> {
        return;
    }

    reportes(freelancer: number): Observable<Reporte[]> {
        return;
    }
}