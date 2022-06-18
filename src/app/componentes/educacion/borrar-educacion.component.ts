import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EducacionService } from '../service/educacion.service';
import { Estudio } from '../models/educacion';
import * as moment from 'moment';

@Component({
  selector: 'app-borrar-educacion',
  templateUrl: './borrar-educacion.component.html',
  styleUrls: ['./borrar-educacion.component.css']
})
export class BorrarEducacionComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  estudio: Estudio;
  borrarEstudioForm: FormGroup;

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsDelModalRef: BsModalRef, private educacionService: EducacionService) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.borrarEstudioForm = this.fb.group({
      id: this.estudio?.id
    })
  }

  onSubmit(): void {
    this.borrarEstudio(this.estudio.id);
  }

  borrarEstudio(id: number): void {
    console.log("Deleting...");
    this.educacionService.delete(id).subscribe(
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

