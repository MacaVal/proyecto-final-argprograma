import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AptitudesService } from '../service/aptitudes.service';
import { Aptitud } from '../models/aptitud';

@Component({
  selector: 'app-borrar-aptitudes',
  templateUrl: './borrar-aptitudes.component.html',
  styleUrls: ['./borrar-aptitudes.component.css']
})
export class BorrarAptitudesComponent implements OnInit {
  modoNuevo: boolean;
  personaCargadaId: number;
  aptitud: Aptitud;
  borraraptitudForm: FormGroup;

  public refreshEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public bsDelModalRef: BsModalRef, private aptitudesService: AptitudesService) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.borraraptitudForm = this.fb.group({
      id: this.aptitud?.id
    })
  }

  onSubmit(): void {
    this.borrarAptitud(this.aptitud.id);
  }

  borrarAptitud(id: number): void {
    console.log("Deleting...");
    this.aptitudesService.delete(id).subscribe(
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


