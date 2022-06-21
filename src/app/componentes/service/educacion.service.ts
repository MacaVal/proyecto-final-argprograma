import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudio } from '../models/educacion';
import { Titulo } from '../models/titulo';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionURL = 'http://localhost:8080/educacion/';
  tituloURL = 'http://localhost:8080/titulo/'

  constructor(private httpClient: HttpClient) { }

  public getTitulo(id: number): Observable<Titulo> {
    return this.httpClient.get<Titulo>(this.tituloURL + `buscar/${id}`);
  }

  public listTitulos(): Observable<Titulo[]> {
    return this.httpClient.get<Titulo[]>(this.tituloURL + `ver`);
  }

  public get(id: number): Observable<Estudio> {
    return this.httpClient.get<Estudio>(this.educacionURL + `buscar/${id}`);
  }

  public edit(id: number, estudio: Estudio): Observable<any> {
    return this.httpClient.put<any>(this.educacionURL + `editar/${id}`, estudio);
  }

  public new(estudio: Estudio): Observable<any> {
    return this.httpClient.post<any>(this.educacionURL + `nuevo`, estudio);
  }

  public list(): Observable<Estudio[]> {
    return this.httpClient.get<Estudio[]>(this.educacionURL + `ver`);
  }

  public delete(id: number): Observable<Estudio> {
    return this.httpClient.delete<Estudio>(this.educacionURL + `borrar/${id}`);
  }
}
