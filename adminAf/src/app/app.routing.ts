import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { IndexColaboradorComponent } from "./components/colaboradores/index-colaborador/index-colaborador.component";
import { IndexDespachosComponent } from "./components/despachos/index-despachos/index-despachos.component";
import { IndexEnviosComponent } from "./components/envios/index-envios/index-envios.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard";
import { CreateColaboradorComponent } from "./components/colaboradores/create-colaborador/create-colaborador.component";
import { UpdateColaboradorComponent } from "./components/colaboradores/update-colaborador/update-colaborador.component";
import { RegistrarDespachosComponent } from "./components/despachos/registrar-despachos/registrar-despachos.component";
import { ClienteEnviosComponent } from "./components/envios/cliente-envios/cliente-envios.component";
import { IndexProgramacionComponent } from "./components/progamaciones/index-programacion/index-programacion.component";
import { EditarProgramacionComponent } from "./components/progamaciones/editar-programacion/editar-programacion.component";
import { CrearProgramacionComponent } from "./components/progamaciones/crear-programacion/crear-programacion.component";

const appRoute : Routes = [
    {path: '', component: InicioComponent, canActivate: [AdminGuard]},
    {path: 'sidebar', component: SidebarComponent, canActivate: [AdminGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'colaborador', component: IndexColaboradorComponent, canActivate: [AdminGuard]},

    //despachos
    {path: 'despachos', component: IndexDespachosComponent, canActivate: [AdminGuard]},
    {path: 'despachos/registrar/:id/:serie', component:RegistrarDespachosComponent, canActivate:[AdminGuard]},
    
    // envios
    {path: 'envios', component: IndexEnviosComponent, canActivate: [AdminGuard]},
    {path: 'envios/detalle/:id', component: ClienteEnviosComponent, canActivate: [AdminGuard]},

    // colaborador
    {path: 'colaborador', component: IndexColaboradorComponent},
    {path: 'colaborador/create', component: CreateColaboradorComponent},
    {path: 'colaborador/:id', component: UpdateColaboradorComponent},

    //programaciones
    {path: 'programacion', component: IndexProgramacionComponent, canActivate: [AdminGuard]},
    {path: 'programacion/editar', component: EditarProgramacionComponent, canActivate: [AdminGuard]},
    {path: 'programacion/crear', component: CrearProgramacionComponent, canActivate: [AdminGuard]}
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);