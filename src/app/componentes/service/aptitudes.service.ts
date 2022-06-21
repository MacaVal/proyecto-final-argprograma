import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aptitud } from '../models/aptitud';

@Injectable({
  providedIn: 'root'
})
export class AptitudesService {

  aptitudesURL = 'http://localhost:8080/aptitudes/';

  constructor(private httpClient: HttpClient) { }

  public get(id: number): Observable<Aptitud> {
    return this.httpClient.get<Aptitud>(this.aptitudesURL + `buscar/${id}`);
  }

  public edit(id: number, aptitud: Aptitud): Observable<any> {
    return this.httpClient.put<any>(this.aptitudesURL + `editar/${id}`, aptitud);
  }

  public list(): Observable<Aptitud[]> {
    return this.httpClient.get<Aptitud[]>(this.aptitudesURL + `ver`);
  }

  public delete(id: number): Observable<Aptitud> {
    return this.httpClient.delete<Aptitud>(this.aptitudesURL + `borrar/${id}`);
  }

  public new(aptitud: Aptitud): Observable<any> {
    return this.httpClient.post<any>(this.aptitudesURL + `nueva`, aptitud);
  }

}
