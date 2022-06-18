import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Experiencia } from '../models/experiencia';
import { TipoEmpleo } from '../models/tipo_empleo';
import { ExperienciaService } from '../service/experiencia.service';
import { LoginService } from '../service/login.service';
import { BorrarExperienciaComponent } from './borrar-experiencia.component';
import { EditarExperienciaComponent } from './editar-experiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit, OnDestroy {
  notifierSubscription: Subscription = this.authService.edicionNotifier.subscribe(nuevoModoEditar => {
    this.esModoEditar = nuevoModoEditar;
  });

  @Input() personaCargadaId: number;
  listaExperiencias: Experiencia[] = [];
  listaTipoEmpleos: TipoEmpleo[] = [];
  esModoEditar: boolean;

  bsModalRef: BsModalRef;
  bsDelModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private experienciaService: ExperienciaService, private authService: LoginService, private delModalService: BsModalService) { }

  ngOnInit(): void {
    this.listarTipoEmpleos()
    this.listarExperiencias();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  listarExperiencias(): void {
    this.experienciaService.list().subscribe(
      data => {
        this.listaExperiencias = data;
      }
    )
  }

  buscarTipoEmpleo(id: number): any {
    return this.listaTipoEmpleos.find(tipo => tipo.id === id)?.nombre_tipo;
  }

  openDeleteModal(experienciaToDelete: Experiencia) {

    const initialState = {
      experiencia: experienciaToDelete
    };

    // Open up the modal
    this.bsDelModalRef = this.delModalService.show(BorrarExperienciaComponent, { initialState });
    this.bsDelModalRef.content.closeBtnName = 'Close';

    // Subscribe to modal's response
    this.bsDelModalRef.content.refreshEvent.subscribe(() => {
      console.log("Actualizando experiencias")
      this.listarExperiencias();
    })
  }

  openModalWithComponent(experienciaToEdit: Experiencia) {
    console.log("Modo Editar", this.authService.getModoEditar())
    console.log("Experiencia before edit", experienciaToEdit, this.personaCargadaId)

    // Setup initial state for modal
    const initialState = {
      personaCargadaId: this.personaCargadaId,
      experiencia: experienciaToEdit,
      modoNuevo: !experienciaToEdit,
      listaTipoEmpleos: this.listaTipoEmpleos
    };

    // Open up the modal
    this.bsModalRef = this.modalService.show(EditarExperienciaComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';

    // Subscribe to modal's response
    this.bsModalRef.content.refreshEvent.subscribe(() => {
      console.log("Actualizando experiencias")
      this.listarExperiencias()
    })
  }

  listarTipoEmpleos(): void {
    this.experienciaService.listTipoEmpleos().subscribe(
      data => {
        this.listaTipoEmpleos = data;
      }
    )
  }
}
