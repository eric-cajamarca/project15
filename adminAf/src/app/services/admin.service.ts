import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: any;
  private _router: any;

  constructor(
    private _http: HttpClient,
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
  public isAuthenticated(allowRoles: string[]): boolean {
    const token: any = localStorage.getItem('token');

    //aqui valido que exista un token
    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);
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

  
  

  getAdmin(token:any):Observable<any>{
    
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + 'admin',{headers:headers});
  }

}


