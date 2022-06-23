import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Credenciales } from '../models/credenciales';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  edicionNotifier: Subject<boolean> = new Subject<boolean>();

  loginURL = 'https://app-portfolioargprograma.herokuapp.com/login/';
  esModoEditar: boolean = false;
  personaAcreditadaId: number;

  constructor(private httpClient: HttpClient) { }

  notifyAboutChange() {
    this.edicionNotifier.next(this.esModoEditar);
  }

  public login(credenciales: Credenciales): Observable<number> {
    return this.httpClient.post<number>(this.loginURL, credenciales);
  }

  setPersonaAcreditadaId(data: number): void {
    this.personaAcreditadaId = data;
  }

  setModoEditar(): void {
    this.esModoEditar = this.personaAcreditadaId != null;
  }

  getModoEditar(): boolean {
    return this.esModoEditar;
  }

}



