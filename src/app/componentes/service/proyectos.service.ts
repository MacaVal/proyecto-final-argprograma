import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  proyectosURL = 'https://app-portfolioargprograma.herokuapp.com/proyectos/';

  constructor(private httpClient: HttpClient) { }

  public get(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.proyectosURL + `buscar/${id}`);
  }

  public edit(id: number, proyecto: Proyecto): Observable<any> {
    return this.httpClient.put<any>(this.proyectosURL + `editar/${id}`, proyecto);
  }

  public list(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.proyectosURL + `ver`);
  }

  public new(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.proyectosURL + `nuevo`, proyecto);
  }

  public delete(id: number): Observable<Proyecto> {
    return this.httpClient.delete<Proyecto>(this.proyectosURL + `borrar/${id}`);
  }
}
