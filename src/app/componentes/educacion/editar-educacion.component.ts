import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EducacionService } from '../service/educacion.service';
import { Estudio } from '../models/educacion';
import { Titulo } from '../models/titulo';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  estudio: Estudio;
  educacionForm: FormGroup;
  listaTitulos: Titulo[] = [];

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.educacionForm = this.fb.group({
      nombre_instituto: this.estudio?.nombre_instituto,
      en_curso: this.estudio ? this.estudio.en_curso : false,
      fecha_inicio: moment(this.estudio?.fecha_inicio).format("YYYY-MM-DD"),
      fecha_fin: moment(this.estudio?.fecha_fin).format("YYYY-MM-DD"),
      descripcion: this.estudio?.descripcion,
      foto_educacion: this.estudio?.foto_educacion,
      titulo_id: this.estudio?.titulo_id,
      persona_id: this.estudio?.persona_id
    })
  }

  onSubmit(): void {
    // llamar a editar educacion con la educacion editada
    console.log("Applying change to Server...", this.educacionForm);
    if (this.educacionForm.value.en_curso) {
      this.educacionForm.patchValue({ fecha_fin: null });
    }

    if (this.modoNuevo) {
      this.educacionForm.patchValue({ persona_id: this.personaCargadaId });
      this.crearEstudioEnApi(this.educacionForm.value);
    } else {
      this.editarEstudioEnApi(this.estudio.id, this.educacionForm.value);
    }
  }

  onClose(): void {
    console.log("Closing modal...");
    this.bsModalRef.hide();
  }

  editarEstudioEnApi(id: number, estudio: Estudio): void {
    this.educacionService.edit(id, estudio).subscribe({
      next: data => {
        console.log("Editar Educacion Service: " + data);
        this.editarEstudio(this.educacionForm.value);
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  crearEstudioEnApi(estudio: Estudio): void {
    this.educacionService.new(this.educacionForm.value).subscribe({
      next: data => {
        console.log("Nueva Educacion Service: " + data);

        // volver a listar o actualizar lista
        this.triggerEvent()
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  editarEstudio(estudioEditado: any) {
    this.estudio.nombre_instituto = estudioEditado.nombre_instituto;
    this.estudio.en_curso = estudioEditado.en_curso;
    this.estudio.fecha_inicio = estudioEditado.fecha_inicio;
    this.estudio.fecha_fin = estudioEditado.fecha_fin;
    this.estudio.descripcion = estudioEditado.descripcion;
    this.estudio.foto_educacion = estudioEditado.foto_educacion;
    this.estudio.titulo_id = estudioEditado.titulo_id;
  }

  triggerEvent() {
    // emit modal's response
    console.log("Sending response from modal...");
    this.refreshEvent.emit();
  }
}