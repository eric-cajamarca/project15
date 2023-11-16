import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { IndexColaboradorComponent } from "./components/colaboradores/index-colaborador/index-colaborador.component";
import { IndexDespachosComponent } from "./components/despachos/index-despachos/index-despachos.component";
import { IndexEnviosComponent } from "./components/envios/index-envios/index-envios.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard";

const appRoute : Routes = [
    {path: '', component: InicioComponent, canActivate: [AdminGuard]},
    {path: 'sidebar', component: SidebarComponent},
    {path: 'login', component: LoginComponent},
    {path: 'colaborador', component: IndexColaboradorComponent},
    {path: 'despachos', component: IndexDespachosComponent},
    {path: 'envios', component: IndexEnviosComponent}
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);