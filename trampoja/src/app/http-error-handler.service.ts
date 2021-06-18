import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor() { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      console.log(message);
      console.error("Message", error.message);
      console.error(serviceName);
      console.error(operation);
      console.error(result);

      // TODO: better job of transforming error for user consumption
      // this.mensagemService.add(`${serviceName}: ${operation} failed: ${message}`)
      
      console.log("status", error.status);

      if (operation == 'tokenUser')
        alert("Email ou senha inválidos.") // Feito desta forma pois o token funciona
                                          // por uma lib externa e não temos controle da resposta
      else if (operation == 'findCNPJ')
        return;
      
      else if (!error.status || (error.status >= 500))
        alert("Ops algo deu errado")

      else
        alert(error.error);

      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/