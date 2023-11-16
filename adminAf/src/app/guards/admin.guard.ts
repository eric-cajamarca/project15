import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { AdminService } from "src/app/services/admin.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _adminService:AdminService,
    private _router:Router
  ){
     
  }

  canActivate(): any {
    const allowedRoles = ['Administrador']; // Lista de roles permitidos para acceder a la ruta
  
    if (!this._adminService.isAuthenticated(allowedRoles)) {
      // El usuario no tiene permisos, redirige a la página de login
      this._router.navigate(['/login']);
      return false;
    }
  
    // Usuario autenticado y con roles permitidos, permite la activación de la ruta
    return true;
  }
  

  // canActivate():any{
  //   if(!this._adminService.isAuthenticated(['Administrador'])){
  //     this._router.navigate(['/login']);
  //     return false;
  //   }

     
    
  //   return true;
  // }
  
}
