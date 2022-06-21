import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EducacionService } from '../service/educacion.service';
import { Estudio } from '../models/educacion';

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
    this.educacionService.delete(id).subscribe(
      () => {
        this.triggerEvent();
        this.bsDelModalRef.hide();
      }
    )
  }

  onClose(): void {
    this.bsDelModalRef.hide();
  }

  triggerEvent() {
    this.refreshEvent.emit();
  }
}

