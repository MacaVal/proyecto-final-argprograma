import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Aptitud } from '../models/aptitud';
import { AptitudesService } from '../service/aptitudes.service';
import { LoginService } from '../service/login.service';
import { BorrarAptitudesComponent } from './borrar-aptitudes.component';
import { EditarAptitudesComponent } from './editar-aptitudes.component';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit, OnDestroy {
  notifierSubscription: Subscription = this.authService.edicionNotifier.subscribe(nuevoModoEditar => {
    this.esModoEditar = nuevoModoEditar;
  });

  @Input() personaCargadaId: number;
  listaAptitudes: Aptitud[] = [];
  esModoEditar: boolean;
  listaColores: string[] = ["donut-segment-1", "donut-segment-2", "donut-segment-3", "donut-segment-4"];
  listaColoresText: string[] = ["donut-text-1", "donut-text-2", "donut-text-3", "donut-text-4"];

  bsModalRef: BsModalRef;
  bsDelModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private aptitudesService: AptitudesService, private authService: LoginService, private delModalService: BsModalService) { }

  ngOnInit(): void {
    this.listarAptitudes();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  getColor(i: number): string {
    let numeroColor = i % this.listaColores.length;
    return this.listaColores[numeroColor];
  }

  getTextColor(i: number): string {
    let numeroColor = i % this.listaColoresText.length;
    return this.listaColoresText[numeroColor];
  }

  listarAptitudes(): void {
    this.aptitudesService.list().subscribe(
      data => {
        this.listaAptitudes = data;
      }
    )
  }

  openDeleteModal(aptitudToDelete: Aptitud) {
    const initialState = {
      aptitud: aptitudToDelete
    };

    this.bsDelModalRef = this.delModalService.show(BorrarAptitudesComponent, { initialState });
    this.bsDelModalRef.content.closeBtnName = 'Close';

    this.bsDelModalRef.content.refreshEvent.subscribe(() => {
      this.listarAptitudes();
    })
  }

  openModalWithComponent(aptitudToEdit: Aptitud) {
    const initialState = {
      personaCargadaId: this.personaCargadaId,
      aptitud: aptitudToEdit,
      modoNuevo: !aptitudToEdit,
      listaAptitudes: this.listaAptitudes
    };

    this.bsModalRef = this.modalService.show(EditarAptitudesComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.content.refreshEvent.subscribe(() => {
      this.listarAptitudes()
    })
  }

  listarTipoEmpleos(): void {
    this.aptitudesService.list().subscribe(
      data => {
        this.listaAptitudes = data;
      }
    )
  }
}