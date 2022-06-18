import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.bsModalRef = this.modalService.show(LoginComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
