import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { PersonaComponent } from './componentes/persona/persona.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { AptitudesComponent } from './componentes/aptitudes/aptitudes.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPersonaComponent } from './componentes/persona/editar-persona.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { EditarExperienciaComponent } from './componentes/experiencia/editar-experiencia.component';


import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditarAptitudesComponent } from './componentes/aptitudes/editar-aptitudes.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { EditarEducacionComponent } from './componentes/educacion/editar-educacion.component';
import { EditarProyectosComponent } from './componentes/proyectos/editar-proyectos.component';
import { BorrarExperienciaComponent } from './componentes/experiencia/borrar-experiencia.component';
import { BorrarEducacionComponent } from './componentes/educacion/borrar-educacion.component';
import { BorrarAptitudesComponent } from './componentes/aptitudes/borrar-aptitudes.component';
import { BorrarProyectosComponent } from './componentes/proyectos/borrar-proyectos.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PersonaComponent,
    ExperienciaComponent,
    AptitudesComponent,
    ProyectosComponent,
    PortfolioComponent,
    EditarPersonaComponent,
    LoginComponent,
    EditarExperienciaComponent,
    EditarAptitudesComponent,
    EducacionComponent,
    EditarEducacionComponent,
    EditarProyectosComponent,
    BorrarExperienciaComponent,
    BorrarEducacionComponent,
    BorrarAptitudesComponent,
    BorrarProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[EditarPersonaComponent],
})
export class AppModule { }
