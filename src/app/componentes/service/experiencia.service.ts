import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';
import { TipoEmpleo } from '../models/tipo_empleo';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  experienciaURL = 'http://localhost:8080/experiencia/';
  educacionURL = 'http://localhost:8080/educacion/';
  tipoEmpleoURL = 'http://localhost:8080/tipoempleo/'

  constructor(private httpClient: HttpClient) { }

  public get(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(this.experienciaURL + `buscar/${id}`);
  }

  public edit(id: number, experiencia: Experiencia): Observable<any> {
    console.log("Llamando api " + id, experiencia);
    return this.httpClient.put<any>(this.experienciaURL + `editar/${id}`, experiencia);
  }

  public list(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(this.experienciaURL + `ver`);
  }

  public deleteExperiencia(id: number): Observable<Experiencia> {
    return this.httpClient.delete<Experiencia>(this.experienciaURL + `borrar/${id}`);
  }

  public new(experiencia: Experiencia): Observable<any> {
    return this.httpClient.post<any>(this.experienciaURL + `nueva`, experiencia);
  }

  public getTipoEmpleo(id: number): Observable<TipoEmpleo> {
    return this.httpClient.get<TipoEmpleo>(this.tipoEmpleoURL + `buscar/${id}`);
  }

  public listTipoEmpleos(): Observable<TipoEmpleo[]> {
    return this.httpClient.get<TipoEmpleo[]>(this.tipoEmpleoURL + `ver`);
  }
}
