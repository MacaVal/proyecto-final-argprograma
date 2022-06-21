import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExperienciaService } from '../service/experiencia.service';
import { Experiencia } from '../models/experiencia';

@Component({
  selector: 'app-borrar-experiencia',
  templateUrl: './borrar-experiencia.component.html',
  styleUrls: ['./borrar-experiencia.component.css']
})
export class BorrarExperienciaComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  experiencia: Experiencia;
  borrarExperienciaForm: FormGroup;

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsDelModalRef: BsModalRef, private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.borrarExperienciaForm = this.fb.group({
      id: this.experiencia?.id
    })
  }

  onSubmit(): void {
    this.borrarExperiencia(this.experiencia.id);
  }

  borrarExperiencia(id: number): void {
    this.experienciaService.delete(id).subscribe(
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

