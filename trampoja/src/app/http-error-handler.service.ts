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

      console.error("Message", error.message);
      console.error(serviceName);
      console.error(operation);
      console.error(result);

      // TODO: better job of transforming error for user consumption
      // this.mensagemService.add(`${serviceName}: ${operation} failed: ${message}`)

      if (serviceName == 'OfertaService') {
        if (operation == 'listOfertas') {
          alert
            ("Não foi possível exibir os trampos... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'profileOfertas') {
          alert
            ("Não foi possível exibir seus trampos... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'createOfertas') {
          alert
            ("Não foi possível criar o trampo... Verfique os dados informados e tente novamente!")
        }
        if (operation == 'detailOfertas') {
          alert
            ("Não foi possível obter detalhes do trampo... Verfique sua conexão ou tente novamente mais tarde! Esse trampo existe?")
        }
        if (operation == 'updateOfertas') {
          alert
            ("Não foi possível editar o trampo... Verfique os dados informados e tente novamente!")
        }
        if (operation == 'deleteOfertas') {
          alert
            ("Não foi possível excluir trampo... Verfique sua conexão ou tente novamente mais tarde! Esse trampo existe?")
        }
      }

      if (serviceName == 'InteresseService') {
        if (operation == 'listInteresse') {
          alert
            ("Não foi possível exibir os interesses... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'createInteresse') {
          alert
            ("Ops... Você já demonstrou interesse nesse trampo!")
        }
      }

      if (serviceName == 'FreelancerService') {
        if (operation == 'listFreelancers') {
          alert
            ("Não foi possível exibir os freelancers... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'profileFreelancer') {
          alert
            ("Não foi possível exibir seu perfil... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'createFreelancer') {
          alert
            ("Ops... Algo deu errado! Verfique os dados informados e tente novamente!")
        }
        if (operation == 'detailFreelancer') {
          alert
            ("Não foi possível obter detalhes do freelancer... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'updateFreelancer') {
          alert
            ("Ops... Algo deu errado! Verfique os dados informados e tente novamente!")
        }
        if (operation == 'historicoFreelancer') {
          alert
            ("Ops... Não foi possível exibir histórico.")
        }
        if (operation == 'countOfertas'){
          alert
            ("Ops... Não foi possível exibir seus trampos")
        }
        if (operation == 'uploadFoto') {
          alert
            ("Ops... Não foi possível subir imagem!")
        }
      }

      if (serviceName == 'EstabelecimentoService') {
        if (operation == 'listEstabelecimentos') {
          alert
            ("Não foi possível exibir os estabelecimentos... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'profileEstabelecimento') {
          alert
            ("Não foi possível exibir seu perfil... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'createEstabelecimento') {
          alert
            ("Ops... Algo deu errado! Verfique os dados informados e tente novamente!")
        }
        if (operation == 'detailEstabelecimento') {
          alert
            ("Não foi possível obter detalhes do estabelecimento... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'updateEstabelecimento') {
          alert
            ("Ops... Algo deu errado! Verfique os dados informados e tente novamente!")
        }
        if (operation == 'uploadLogo') {
          alert
            ("Ops... Não foi possível subir imagem!")
        }
      }

      if (serviceName == 'EnderecoService') {
        if (operation == 'profileEndereco') {
          alert
            ("Não foi possível exibir seu endereço... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'createEndereco') {
          alert
            ("Ops... Algo deu errado! Verfique os dados informados e tente novamente!")
        }
        if (operation == 'updateEndereco') {
          alert
            ("Ops... Algo deu errado! Verfique os dados informados e tente novamente!")
        }
      }

      if (serviceName == 'ConfirmadoService') {
        if (operation == 'listConfirmados') {
          alert
            ("Não foi possível exibir os confirmados... Verfique sua conexão ou tente novamente mais tarde!")
        }
        if (operation == 'createConfirmado') {
          alert
            ("Ops... Não é possível confirmar um trampo com a data no passado!")
        }
      }

      if (serviceName == 'UserService') {
        if (operation == 'createUser') {
          alert
            ("Não foi possível realizar o cadastro... Este email ja esta cadastrado!")
        }
        if (operation == 'loginUser') {
          alert
            ("Email ou senha incorretos!")
        }
        if (operation == 'updateEmailUser') {
          alert
            ("Email já cadastrado!")
        }
        if (operation == 'updatePasswordUser') {
          alert
            ("Ops... Algo deu errado!")
        }
        if (operation == 'RecoveryPassword') {
          alert
            ("Ops... Este email não está cadastrado!")
        }
      }

      if (serviceName == 'AvaliacaoService') {
        if (operation == 'createAvaliacao'){
          alert
            ("Ops... Você já avaliou isso aqui.")
        }
        if (operation == 'getAvaliacao'){
          alert
            ("Ops... Não foi possível exibir sua avaliação.")
        }
      }

      if (serviceName == 'CanceladoService') {
        if (operation == 'createCancelado'){
          alert
            ("Ops... O trampo precisa ser cancelado com 6 horas de antecedência")
        }
        if (operation == 'listCancelado'){
          alert
            ("Não foi possível exibir seus trampos cancelados... Verfique sua conexão ou tente novamente mais tarde!")
        }
      }


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