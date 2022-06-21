import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Estudio } from '../models/educacion';
import { Titulo } from '../models/titulo';
import { EducacionService } from '../service/educacion.service';
import { LoginService } from '../service/login.service';
import { BorrarEducacionComponent } from './borrar-educacion.component';
import { EditarEducacionComponent } from './editar-educacion.component';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit, OnDestroy {
  notifierSubscription: Subscription = this.authService.edicionNotifier.subscribe(nuevoModoEditar => {
    this.esModoEditar = nuevoModoEditar;
  });

  @Input() personaCargadaId: number;
  listaEducacion: Estudio[] = [];
  listaTitulos: Titulo[] = [];
  esModoEditar: boolean;

  bsModalRef: BsModalRef;
  bsDelModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private educacionService: EducacionService, private authService: LoginService, private delModalService: BsModalService) { }

  ngOnInit(): void {
    this.listarTitulos()
    this.listarEducacion();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  listarEducacion(): void {
    this.educacionService.list().subscribe(
      data => {
        this.listaEducacion = data;
      }
    )
  }

  buscarTipoEmpleo(id: number): any {
    return this.listaTitulos.find(tipo => tipo.id === id)?.nombre_titulo;
  }

  openDeleteModal(estudioToDelete: Estudio) {
    const initialState = {
      estudio: estudioToDelete
    };

    this.bsDelModalRef = this.delModalService.show(BorrarEducacionComponent, { initialState });
    this.bsDelModalRef.content.closeBtnName = 'Close';

    this.bsDelModalRef.content.refreshEvent.subscribe(() => {
      this.listarEducacion();
    })
  }

  openModalWithComponent(estudioToEdit: Estudio) {
    const initialState = {
      personaCargadaId: this.personaCargadaId,
      estudio: estudioToEdit,
      modoNuevo: !estudioToEdit,
      listaTitulos: this.listaTitulos
    };

    this.bsModalRef = this.modalService.show(EditarEducacionComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.content.refreshEvent.subscribe(() => {
      this.listarEducacion()
    })
  }

  listarTitulos(): void {
    this.educacionService.listTitulos().subscribe(
      data => {
        this.listaTitulos = data;
      }
    )
  }
}