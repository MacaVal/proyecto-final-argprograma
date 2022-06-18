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

  personaLogueada: Persona;
  personaForm: FormGroup;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.personaForm = this.fb.group({
      nombre: this.personaLogueada.nombre,
      apellido: this.personaLogueada.apellido,
      titulo: this.personaLogueada.titulo,
      acerca_de_mi: this.personaLogueada.acerca_de_mi,
      url_foto: this.personaLogueada.url_foto,
      url_banner: this.personaLogueada.url_banner
    })
  }

  onSubmit(): void {
    // llamar a editar persona con la persona editada
    console.log("Applying change to Server...", this.personaForm);
    this.editarPersonaEnApi(this.personaLogueada.id, this.personaForm.value)
  }

  onClose(): void {
    console.log("Closing modal...");
    this.bsModalRef.hide();
  }

  editarPersonaEnApi(id: number, persona: Persona): void {
    this.personaService.edit(id, persona).subscribe({
      next: data => {
        console.log("Editar Persona Service: " + data);
        this.editarPersonaLogueada(this.personaForm.value);
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  editarPersonaLogueada(personaEditada: any) {
    this.personaLogueada.nombre = personaEditada.nombre;
    this.personaLogueada.apellido = personaEditada.apellido;
    this.personaLogueada.titulo = personaEditada.titulo;
    this.personaLogueada.acerca_de_mi = personaEditada.acerca_de_mi;
    this.personaLogueada.url_foto = personaEditada.url_foto;
    this.personaLogueada.url_banner = personaEditada.url_banner;
  }
}
