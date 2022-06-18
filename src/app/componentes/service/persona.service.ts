import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaURL = 'http://localhost:8080/persona/';

  constructor(private httpClient: HttpClient) { }

  public get(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.personaURL + `buscar/${id}`)
  }

  public edit(id: number, persona: Persona): Observable<any> {
    console.log("Llamando api " + id, persona)
    return this.httpClient.put<any>(this.personaURL + `editar/${id}`, persona);
  }

  public list(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL + `ver`);
  }

}
