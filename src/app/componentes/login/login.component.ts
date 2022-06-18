import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Credenciales } from '../models/credenciales';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private loginService: LoginService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      mail: '',
      password: ''
    })
  }

  onClose(): void {
    console.log("Closing modal...");
    this.bsModalRef.hide();
  }

  onSubmit(): void {
    this.iniciarSesion(this.loginForm.value);
  }

  iniciarSesion(credenciales: Credenciales): any {
    this.loginService.login(credenciales).subscribe({
      next: data => {
        console.log("Login Service: " + data);
        this.loginService.setPersonaAcreditadaId(data);
        this.loginService.setModoEditar();
        this.loginService.notifyAboutChange();
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

}
