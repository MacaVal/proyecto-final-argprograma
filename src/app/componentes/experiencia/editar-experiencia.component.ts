import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExperienciaService } from '../service/experiencia.service';
import { Experiencia } from '../models/experiencia';
import { TipoEmpleo } from '../models/tipo_empleo';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css']
})
export class EditarExperienciaComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  experiencia: Experiencia;
  experienciaForm: FormGroup;
  listaTipoEmpleos: TipoEmpleo[] = [];

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.experienciaForm = this.fb.group({
      cargo: this.experiencia?.cargo,
      nombre_empresa: this.experiencia?.nombre_empresa,
      es_actual: this.experiencia ? this.experiencia.es_actual : false,
      fecha_inicio: moment(this.experiencia?.fecha_inicio).format("YYYY-MM-DD"),
      fecha_fin: moment(this.experiencia?.fecha_fin).format("YYYY-MM-DD"),
      descripcion: this.experiencia?.descripcion,
      foto_experiencia: this.experiencia?.foto_experiencia,
      tipo_empleo_id: this.experiencia?.tipo_empleo_id,
      persona_id: this.experiencia?.persona_id
    })
  }

  onSubmit(): void {
    // llamar a editar educacion con la educacion editada
    console.log("Applying change to Server...", this.experienciaForm);
    if (this.experienciaForm.value.es_actual) {
      this.experienciaForm.patchValue({ fecha_fin: null });
    }

    if (this.modoNuevo) {
      this.experienciaForm.patchValue({ persona_id: this.personaCargadaId });
      this.crearExperienciaEnApi(this.experienciaForm.value);
    } else {
      this.editarExperienciaEnApi(this.experiencia.id, this.experienciaForm.value);
    }
  }

  onClose(): void {
    console.log("Closing modal...");
    this.bsModalRef.hide();
  }

  editarExperienciaEnApi(id: number, experiencia: Experiencia): void {
    this.experienciaService.edit(id, experiencia).subscribe({
      next: data => {
        console.log("Editar Experiencia Service: " + data);
        this.editarExperiencia(this.experienciaForm.value);
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  crearExperienciaEnApi(experiencia: Experiencia): void {
    this.experienciaService.new(this.experienciaForm.value).subscribe({
      next: data => {
        console.log("Nueva Experiencia Service: " + data);

        // volver a listar o actualizar lista
        this.triggerEvent()
        // cerras el modal
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  editarExperiencia(experienciaEditada: any) {
    this.experiencia.cargo = experienciaEditada.cargo;
    this.experiencia.nombre_empresa = experienciaEditada.nombre_empresa;
    this.experiencia.es_actual = experienciaEditada.es_actual;
    this.experiencia.fecha_inicio = experienciaEditada.fecha_inicio;
    this.experiencia.fecha_fin = experienciaEditada.fecha_fin;
    this.experiencia.descripcion = experienciaEditada.descripcion;
    this.experiencia.foto_experiencia = experienciaEditada.foto_experiencia;
    this.experiencia.tipo_empleo_id = experienciaEditada.tipo_empleo_id;
  }

  triggerEvent() {
    // emit modal's response
    console.log("Sending response from modal...");
    this.refreshEvent.emit();
  }
}

