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

const appRoute : Routes = [
    {path: '', component: InicioComponent, canActivate: [AdminGuard]},
    {path: 'sidebar', component: SidebarComponent, canActivate: [AdminGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'colaborador', component: IndexColaboradorComponent, canActivate: [AdminGuard]},
    {path: 'despachos', component: IndexDespachosComponent, canActivate: [AdminGuard]},
    {path: 'despachos/registrar', component:RegistrarDespachosComponent, canActivate:[AdminGuard]},
    {path: 'envios', component: IndexEnviosComponent, canActivate: [AdminGuard]},

    // colaborador
    {path: 'colaborador', component: IndexColaboradorComponent},
    {path: 'colaborador/create', component: CreateColaboradorComponent},
    {path: 'colaborador/:id', component: UpdateColaboradorComponent}
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);