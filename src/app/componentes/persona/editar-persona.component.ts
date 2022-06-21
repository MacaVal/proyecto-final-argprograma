import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Persona } from '../models/persona';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})

export class EditarPersonaComponent implements OnInit {

  persona: Persona;
  personaForm: FormGroup;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.personaForm = this.fb.group({
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      titulo: this.persona.titulo,
      acerca_de_mi: this.persona.acerca_de_mi,
      url_foto: this.persona.url_foto,
      url_banner: this.persona.url_banner
    })
  }

  onSubmit(): void {
    this.editarPersonaEnApi(this.persona.id, this.personaForm.value)
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  editarPersonaEnApi(id: number, persona: Persona): void {
    this.personaService.edit(id, persona).subscribe({
      next: data => {
        this.editarPersona(this.personaForm.value);
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  editarPersona(personaEditada: any) {
    this.persona.nombre = personaEditada.nombre;
    this.persona.apellido = personaEditada.apellido;
    this.persona.titulo = personaEditada.titulo;
    this.persona.acerca_de_mi = personaEditada.acerca_de_mi;
    this.persona.url_foto = personaEditada.url_foto;
    this.persona.url_banner = personaEditada.url_banner;
  }
}
