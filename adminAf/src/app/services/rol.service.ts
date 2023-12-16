import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }


  obtener_roles(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'rol/',{headers:headers});
  }

  obtener_rol_id(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'rol/'+id,{headers:headers});
  }

  //crea el sercicio actualizar_rol
  actualizar_rol(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'rol/'+id,data,{headers:headers});
  }

  //crea el servicio crear_rol
  crear_rol(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'rol/',data,{headers:headers});
  }

}
