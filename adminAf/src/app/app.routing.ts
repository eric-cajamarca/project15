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
import { IdexRolComponent } from "./components/roles/idex-rol/idex-rol.component";
import { UpdateRolComponent } from "./components/roles/update-rol/update-rol.component";
import { CreateRolComponent } from "./components/roles/create-rol/create-rol.component";
import { IndexClientesComponent } from "./components/clientes/index-clientes/index-clientes.component";
import { CreateClientesComponent } from "./components/clientes/create-clientes/create-clientes.component";
import { UpdateClientesComponent } from "./components/clientes/update-clientes/update-clientes.component";
import { IndexComprasComponent } from "./components/compras/index-compras/index-compras.component";
import { CreateComprasComponent } from "./components/compras/create-compras/create-compras.component";
import { UpdateComprasComponent } from "./components/compras/update-compras/update-compras.component";
import { DetalleComprasComponent } from "./components/compras/detalle-compras/detalle-compras.component";
import { IndexSucursalComponent } from "./components/sucursal/index-sucursal/index-sucursal.component";
import { CreateSucursalComponent } from "./components/sucursal/create-sucursal/create-sucursal.component";
import { UpdateSucursalComponent } from "./components/sucursal/update-sucursal/update-sucursal.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { UpdateProductoComponent } from "./components/productos/update-producto/update-producto.component";
import { PrincipalInventarioComponent } from "./components/inventario/principal-inventario/principal-inventario.component";
import { IndexMarcaComponent } from "./components/marcas/index-marca/index-marca.component";
import { CreateMarcaComponent } from "./components/marcas/create-marca/create-marca.component";
import { IndexEmpresaComponent } from "./components/empresas/index-empresa/index-empresa.component";
import { CreateEmpresaComponent } from "./components/empresas/create-empresa/create-empresa.component";
import { LoginEmpresaComponent } from "./components/login-empresa/login-empresa.component";
import { UpdateEmpresaComponent } from "./components/empresas/update-empresa/update-empresa.component";

const appRoute : Routes = [
    {path: '', component: InicioComponent, canActivate: [AdminGuard]},
    {path: 'sidebar', component: SidebarComponent, canActivate: [AdminGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'logempresa', component: LoginEmpresaComponent},
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
    {path: 'programacion/crear', component: CrearProgramacionComponent, canActivate: [AdminGuard]},

    //rol
    {path: 'rol', component: IdexRolComponent, canActivate: [AdminGuard]},
    {path: 'rol/create', component: CreateRolComponent, canActivate: [AdminGuard]},
    {path: 'rol/:id', component: UpdateRolComponent, canActivate: [AdminGuard]},

    //clientes
    {path: 'cliente', component: IndexClientesComponent, canActivate: [AdminGuard]},
    {path: 'cliente/create', component: CreateClientesComponent},
    {path: 'cliente/:id', component: UpdateClientesComponent, canActivate: [AdminGuard]},

    //compras
    {path: 'compras', component: IndexComprasComponent, canActivate: [AdminGuard]},
    {path: 'compras/create', component: CreateComprasComponent, canActivate: [AdminGuard]},
    {path: 'compras/:id', component: UpdateComprasComponent, canActivate: [AdminGuard]},
    {path: 'compras/detalle/:id', component: DetalleComprasComponent,canActivate: [AdminGuard]},

    //sucursales
    {path: 'sucursal', component: IndexSucursalComponent, canActivate: [AdminGuard]},
    {path: 'sucursal/create', component: CreateSucursalComponent, canActivate: [AdminGuard]},
    {path: 'sucursal/:id', component: UpdateSucursalComponent, canActivate: [AdminGuard]},

    //productos
    {path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/:id', component: UpdateProductoComponent, canActivate: [AdminGuard]},

    //inventario
    {path: 'inventario', component: PrincipalInventarioComponent, canActivate: [AdminGuard]},

    //marcas
    {path: 'marcas', component: IndexMarcaComponent, canActivate: [AdminGuard]},
    {path: 'marcas/create', component: CreateMarcaComponent, canActivate: [AdminGuard]},

    //empresas
    {path: 'empresa', component: IndexEmpresaComponent, canActivate: [AdminGuard]},
    {path: 'empresa/create', component: CreateEmpresaComponent, canActivate: [AdminGuard]},
    {path: 'empresa/:id', component: UpdateEmpresaComponent, canActivate: [AdminGuard]},
]

export const appRoutingProviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);