import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

const appRoute : Routes = [
    {path: '', component: InicioComponent},
    {path: 'sidebar', component: SidebarComponent}
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);