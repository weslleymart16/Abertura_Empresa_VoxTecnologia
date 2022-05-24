import { environment } from './../../../environments/environment';
import { retry } from 'rxjs/operators';
import { Company } from '../../shared/models/company';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  private url = environment.apiUrl; // api rest fake

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos os registros

  getAll(): Observable<Company[]> {
    return this.httpClient
      .get<Company[]>(`${this.url}/empresas`)
      .pipe(retry(2));
  }

  // Obtem um registro pelo id

  getById(id: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.url}/empresas/${id}`)
      .pipe(retry(2));
  }

  // atualiza um registro

  update(company: Company): Observable<Company> {
    return this.httpClient
      .put<Company>(
        `${this.url}/empresas/${company.id}`,
        JSON.stringify(company),
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
