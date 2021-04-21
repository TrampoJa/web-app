import { Injectable } from '@angular/core';
import { AppService} from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { Endereco } from './endereco';
import { Observable } from 'rxjs';

@Injectable()
export class EnderecoService {
  private handleError: HandleError;

  constructor (
    private service: AppService,
    httpErrorHandler: HttpErrorHandler
  ) { this.handleError = httpErrorHandler.createHandleError('EnderecoService'); }

  profile(): Observable<Endereco> {
    return this.service.http.get<Endereco>
      (this.service.appRoot.concat("endereco/profile"))
      .pipe(
        catchError(this.handleError<Endereco>('profileEndereco')
      )
    );
  }

  create(endereco: any): Observable<Endereco> {
    return this.service.http.post<Endereco>
      (this.service.appRoot.concat('endereco/create'), endereco)
      .pipe(
        catchError(this.handleError<Endereco>('createEndereco')
      )
    );
  }

  update(id: string | number, endereco: Endereco): Observable<Endereco> {
    return this.service.http.put<Endereco>
      (this.service.appRoot.concat(`endereco/update/${id}`), endereco)
      .pipe(
        catchError(this.handleError<Endereco>('updateEndereco')
      )
    );
  }
}