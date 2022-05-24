import { States } from '../../shared/models/states.model';
import { Entity } from '../../shared/models/entity.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Company } from '../../shared/models/company';

@Injectable()
export class CadastroService {
  private url = environment.apiUrl; // api rest fake

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // salva um registro

  save(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(
        `${this.url}/empresas`,
        JSON.stringify(company),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  // Manipulação de erros

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // Obter a entidade de registro

  getEntityRegister(): Observable<Entity[]> {
    return this.httpClient
      .get<Entity[]>(`${this.url}/entidade-registro`)
      .pipe(retry(2));
  }

  getStates(): Observable<States[]> {
    return this.httpClient
      .get<States[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/`
      )
      .pipe(retry(2));
  }
}
