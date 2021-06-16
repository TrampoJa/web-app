import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { UserService } from '../users/user.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Router } from '@angular/router';

import { Freelancer } from './freelancer';
import { Historico } from './historico';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class FreelancerService {
  private handleError: HandleError;

  constructor(
    private service: AppService,
    private userService: UserService,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) { this.handleError = httpErrorHandler.createHandleError('FreelancerService'); }

  list(): Observable<Freelancer[]> {
    return this.service.http.get<Freelancer[]>
      (this.service.appRoot.concat("freelancer/liste"))
      .pipe(
        catchError(this.handleError('listFreelancers', [])
      )
    );
  }

  profile(): Observable<Freelancer> {
    return this.service.http.get<Freelancer>
      (this.service.appRoot.concat("freelancer/profile"))
      .pipe(
        catchError(this.handleError<Freelancer>('profileFreelancer')
      )
    );
  }

  create(freelancer: any): Observable<Freelancer> {
    let res;
    return this.service.http.post<Freelancer>
      (this.service.appRoot.concat('freelancer/create'), freelancer)
      .pipe(
        tap(response => res = response),
        finalize(() => {
            if (res) {
                localStorage.setItem('GROUP', JSON.stringify({group: res[1] ['last_name']}));
                while (!this.userService.groupValue) {
                  this.userService.groupSubject.next(res[1] ['last_name']);
                }
                this.router.navigate(['/upload']);
            }   
        }),
        catchError(this.handleError<Freelancer>('createFreelancer')
      )
    );
  }

  detail(id: number | string): Observable<Freelancer> {
    return this.service.http.get<Freelancer>
      (this.service.appRoot.concat(`freelancer/detail/${id}`))
      .pipe(
        catchError(this.handleError<Freelancer>('detailFreelancer')
      )
    );
  }

  update(id: string | number, freelancer: Freelancer): Observable<Freelancer> {
    let res;
    return this.service.http.put<Freelancer>
      (this.service.appRoot.concat(`freelancer/update/${id}`), freelancer)
      .pipe(
        tap(response => res = response),
        finalize(() => {
            if(res) {
            alert("Sucesso");
          }
        }),
        catchError(this.handleError<Freelancer>('updateFreelancer')
      )
    );
  }

  upload(id: number | string, foto: any): Observable<Freelancer> {
    return this.service.http.post<Freelancer>
      (this.service.appRoot.concat(`freelancer/upload/${id}`), foto)
      .pipe(
        catchError(this.handleError<Freelancer>('uploadFoto')
      )
    );
  }

  uploadDocs(step: number, foto: any): Observable<Freelancer> {
    return this.service.http.post<Freelancer>
      (this.service.appRoot.concat(`freelancer/upload-docs/${step}`), foto)
      .pipe(
        catchError(this.handleError<Freelancer>('uploadDocs')
      )
    );
  }

  history(freelancer_owner: number | string): Observable<Historico[]> {
    return this.service.http.get<Historico[]>
      (this.service.appRoot.concat(`freelancer/historico/${freelancer_owner}`))
      .pipe(
        catchError(this.handleError('historicoFreelancers', [])
      )
    );
  }

  countOfertas(): Observable<any> {
    return this.service.http.get<Freelancer>
        (this.service.appRoot.concat("freelancer/count-ofertas"))
        .pipe(
            catchError(this.handleError('countOfertas')
        ) 
    );
  }
}