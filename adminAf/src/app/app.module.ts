import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing} from "./app.routing";
import { InicioComponent } from './components/inicio/inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { IndexColaboradorComponent } from './components/colaboradores/index-colaborador/index-colaborador.component';
import { IndexDespachosComponent } from './components/despachos/index-despachos/index-despachos.component';
import { IndexEnviosComponent } from './components/envios/index-envios/index-envios.component';
import { CreateColaboradorComponent } from './components/colaboradores/create-colaborador/create-colaborador.component';
import { UpdateColaboradorComponent } from './components/colaboradores/update-colaborador/update-colaborador.component';
import { RegistrarDespachosComponent } from './components/despachos/registrar-despachos/registrar-despachos.component';
import {CookieService} from 'ngx-cookie-service';
import { ClienteEnviosComponent } from './components/envios/cliente-envios/cliente-envios.component';
import { IndexProgramacionComponent } from './components/progamaciones/index-programacion/index-programacion.component';
import { CrearProgramacionComponent } from './components/progamaciones/crear-programacion/crear-programacion.component';
import { EditarProgramacionComponent } from './components/progamaciones/editar-programacion/editar-programacion.component';
import { IdexRolComponent } from './components/roles/idex-rol/idex-rol.component';
import { CreateRolComponent } from './components/roles/create-rol/create-rol.component';
import { UpdateRolComponent } from './components/roles/update-rol/update-rol.component';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { UpdateClientesComponent } from './components/clientes/update-clientes/update-clientes.component';
import { CreateClientesComponent } from './components/clientes/create-clientes/create-clientes.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    TopNavComponent,
    IndexColaboradorComponent,
    IndexDespachosComponent,
    IndexEnviosComponent,
    CreateColaboradorComponent,
    UpdateColaboradorComponent,
    RegistrarDespachosComponent,
    ClienteEnviosComponent,
    IndexProgramacionComponent,
    CrearProgramacionComponent,
    EditarProgramacionComponent,
    IdexRolComponent,
    CreateRolComponent,
    UpdateRolComponent,
    IndexClientesComponent,
    UpdateClientesComponent,
    CreateClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
