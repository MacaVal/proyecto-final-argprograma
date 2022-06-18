import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProyectosService } from '../service/proyectos.service';
import { Proyecto } from '../models/proyecto';

@Component({
  selector: 'app-editar-proyectos',
  templateUrl: './editar-proyectos.component.html',
  styleUrls: ['./editar-proyectos.component.css']
})
export class EditarProyectosComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  proyecto: Proyecto;
  proyectoForm: FormGroup;

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private proyectosService: ProyectosService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.proyectoForm = this.fb.group({
      nombre_proyecto: this.proyecto?.nombre_proyecto,
      descripcion: this.proyecto?.descripcion,
      foto_proyecto: this.proyecto?.foto_proyecto,
      url_proyecto: this.proyecto?.url_proyecto,
      persona_id: this.proyecto?.persona_id
    })
  }

  onSubmit(): void {
    // llamar a editar educacion con la educacion editada
    console.log("Applying change to Server...", this.proyectoForm);

    if (this.modoNuevo) {
      this.proyectoForm.patchValue({ persona_id: this.personaCargadaId });
      this.crearProyectoEnApi(this.proyectoForm.value);
    } else {
      this.editarProyectoEnApi(this.proyecto.id, this.proyectoForm.value);
    }
  }

  onClose(): void {
    console.log("Closing modal...");
    this.bsModalRef.hide();
  }

  editarProyectoEnApi(id: number, proyecto: Proyecto): void {
    this.proyectosService.edit(id, proyecto).subscribe({
      next: data => {
        console.log("Editar Proyectos Service: " + data);
        this.editarProyecto(this.proyectoForm.value);
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  crearProyectoEnApi(proyecto: Proyecto): void {
    this.proyectosService.new(this.proyectoForm.value).subscribe({
      next: data => {
        console.log("Nuevo Proyecto Service: " + data);

        // volver a listar o actualizar lista
        this.triggerEvent()
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  editarProyecto(proyectoEditado: any) {
    this.proyecto.nombre_proyecto = proyectoEditado.nombre_proyecto;
    this.proyecto.descripcion = proyectoEditado.descripcion;
    this.proyecto.foto_proyecto = proyectoEditado.foto_proyecto;
    this.proyecto.url_proyecto = proyectoEditado.url_proyecto;
  }

  triggerEvent() {
    // emit modal's response
    console.log("Sending response from modal...");
    this.refreshEvent.emit();
  }
}

