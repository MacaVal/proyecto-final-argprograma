import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProyectosService } from '../service/proyectos.service';
import { Proyecto } from '../models/proyecto';

@Component({
  selector: 'app-borrar-proyectos',
  templateUrl: './borrar-proyectos.component.html',
  styleUrls: ['./borrar-proyectos.component.css']
})
export class BorrarProyectosComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  proyecto: Proyecto;
  borrarProyectoForm: FormGroup;

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsDelModalRef: BsModalRef, private proyectosService: ProyectosService) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.borrarProyectoForm = this.fb.group({
      id: this.proyecto?.id
    })
  }

  onSubmit(): void {
    this.borrarProyecto(this.proyecto.id);
  }

  borrarProyecto(id: number): void {
    console.log("Deleting...");
    this.proyectosService.delete(id).subscribe(
      () => {
        // volver a listar o actualizar lista
        this.triggerEvent();
        // cerras el modal
        this.bsDelModalRef.hide();
      }
    )
  }

  onClose(): void {
    console.log("Closing modal...");
    this.bsDelModalRef.hide();
  }

  triggerEvent() {
    // emit modal's response
    console.log("Sending response from modal...");
    this.refreshEvent.emit();
  }
}


