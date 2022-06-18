import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Persona } from '../models/persona';
import { LoginService } from '../service/login.service';
import { PersonaService } from '../service/persona.service';
import { EditarPersonaComponent } from './editar-persona.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, OnDestroy {
  notifierSubscription: Subscription = this.authService.edicionNotifier.subscribe(nuevoModoEditar => {
    this.esModoEditar = nuevoModoEditar;
  });

  @Input() personaCargadaId: number;
  personas: Persona[] = [];
  personaLogueada: Persona;
  esModoEditar: boolean;

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private personaService: PersonaService, private authService: LoginService) { }

  ngOnInit(): void {
    this.buscarPersona(this.personaCargadaId);
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  listarPersonas(): void {
    this.personaService.list().subscribe(
      data => {
        this.personas = data;
      }
    )
  }

  buscarPersona(id: number): void {
    this.personaService.get(id).subscribe(
      data => {
        this.personaLogueada = data;
      }
    )
  }

  openModalWithComponent(personaToEdit: Persona) {
    console.log("Modo Editar", this.authService.getModoEditar())
    console.log("Persona before edit", personaToEdit)

    // Setup initial state for modal
    const initialState = {
      personaLogueada: personaToEdit
    };

    // Open up the modal
    this.bsModalRef = this.modalService.show(EditarPersonaComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';

  }
}