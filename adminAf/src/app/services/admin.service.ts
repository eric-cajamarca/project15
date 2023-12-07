import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
//import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: any;
  private _router: any;
  public idUser: any;

  constructor(
    private _http: HttpClient,
    private cookieService: CookieService,
    // private loggerService: LoggerService // Add the loggerService dependency
  ) {
    this.url = GLOBAL.url;
  }

  admin_login(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'admin_login', data, { headers: headers });
  }

  gettoken() {
    return localStorage.getItem('token');
  }


  //aqui creo el servicio para la autenticacion del token
  public isAuthenticated_Anterior(allowRoles: string[]): boolean {
    const token: any = localStorage.getItem('token');

    //aqui valido que exista un token
    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      // console.log(decodedToken);
      const { nombres, apellidos } = decodedToken;
      this.idUser = { nombres, apellidos };
      //aqui valido que el token sea valido
      if (!decodedToken) {
        console.log('token no valido');
        localStorage.removeItem('token');
        return false;
      }


    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }


    return allowRoles.includes(decodedToken['rol']);

  }





  public isAuthenticated(allowRoles: string[]): boolean {
    const token: any = this.cookieService.get('token'); // Use HttpOnly cookies

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      const { nombres, apellidos } = decodedToken;
      this.idUser = { nombres, apellidos };

      if (!decodedToken) {
        console.log('token no valido');
        this.cookieService.delete('token'); // Use HttpOnly cookies
        return false;
      }
    } catch (error) {
      //this.loggerService.error(error); // Log errors
      this.cookieService.delete('token'); // Use HttpOnly cookies
      return false;
    }

    return allowRoles.includes(decodedToken['rol']);


    
  }

  registro_colaborador_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'admin', data, { headers: headers });
  }


  getAdmin(token: any): Observable<any> {

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'admin', { headers: headers });
  }

  cambiar_estado_colaborador_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'cambiar_estado_colaborador_admin/' + id, data, { headers: headers });
  }

  obtener_datos_colaborador_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_datos_colaborador_admin/' + id, { headers: headers });
  }

  editar_colaborador_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'admin/' + id, data, { headers: headers });
  }
}


