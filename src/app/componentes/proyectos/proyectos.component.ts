import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Proyecto } from '../models/proyecto';
import { ProyectosService } from '../service/proyectos.service';
import { LoginService } from '../service/login.service';
import { EditarProyectosComponent } from './editar-proyectos.component';
import { BorrarProyectosComponent } from './borrar-proyectos.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit, OnDestroy {
  notifierSubscription: Subscription = this.authService.edicionNotifier.subscribe(nuevoModoEditar => {
    this.esModoEditar = nuevoModoEditar;
  });

  @Input() personaCargadaId: number;
  listaProyectos: Proyecto[] = [];
  esModoEditar: boolean;

  bsModalRef: BsModalRef;
  bsDelModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private proyectosService: ProyectosService, private authService: LoginService, private delModalService: BsModalService) { }

  ngOnInit(): void {
    this.listarProyectos();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  listarProyectos(): void {
    this.proyectosService.list().subscribe(
      data => {
        this.listaProyectos = data;
      }
    )
  }

  openDeleteModal(proyectoToDelete: Proyecto) {
    const initialState = {
      proyecto: proyectoToDelete
    };

    this.bsDelModalRef = this.delModalService.show(BorrarProyectosComponent, { initialState });
    this.bsDelModalRef.content.closeBtnName = 'Close';

    this.bsDelModalRef.content.refreshEvent.subscribe(() => {
      this.listarProyectos();
    })
  }

  openModalWithComponent(proyectoToEdit: Proyecto) {
    const initialState = {
      personaCargadaId: this.personaCargadaId,
      proyecto: proyectoToEdit,
      modoNuevo: !proyectoToEdit,
    };

    this.bsModalRef = this.modalService.show(EditarProyectosComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.content.refreshEvent.subscribe(() => {
      this.listarProyectos();
    })
  }
}