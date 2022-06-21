import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AptitudesService } from '../service/aptitudes.service';
import { Aptitud } from '../models/aptitud';

@Component({
  selector: 'app-editar-aptitudes',
  templateUrl: './editar-aptitudes.component.html',
  styleUrls: ['./editar-aptitudes.component.css']
})
export class EditarAptitudesComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  aptitud: Aptitud;
  aptitudesForm: FormGroup;
  listaAptitudes: Aptitud[] = [];

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef, private aptitudesService: AptitudesService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.aptitudesForm = this.fb.group({
      nombre_aptitud: this.aptitud?.nombre_aptitud,
      porcentaje: this.aptitud?.porcentaje,
      persona_id: this.aptitud?.persona_id
    })
  }

  onSubmit(): void {
    if (this.aptitudesForm.value.es_actual) {
      this.aptitudesForm.patchValue({ fecha_fin: null });
    }

    if (this.modoNuevo) {
      this.aptitudesForm.patchValue({ persona_id: this.personaCargadaId });
      this.crearAptitudEnApi(this.aptitudesForm.value);
    } else {
      this.editarAptitudEnApi(this.aptitud.id, this.aptitudesForm.value);
    }
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  editarAptitudEnApi(id: number, aptitud: Aptitud): void {
    this.aptitudesService.edit(id, aptitud).subscribe({
      next: data => {
        this.editarAptitud(this.aptitudesForm.value);
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  crearAptitudEnApi(aptitud: Aptitud): void {
    this.aptitudesService.new(this.aptitudesForm.value).subscribe({
      next: data => {
        this.triggerEvent();
        this.bsModalRef.hide();
      },
      error: err => alert("La información brindada es incorrecta")
    })
  }

  editarAptitud(aptitudEditada: any) {
    this.aptitud.nombre_aptitud = aptitudEditada.nombre_aptitud;
    this.aptitud.porcentaje = aptitudEditada.porcentaje;
  }

  triggerEvent() {
    this.refreshEvent.emit();
  }
}

