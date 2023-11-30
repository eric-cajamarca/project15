
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class DespachoSerciceService {
  public url: any;
  private _router: any;
  public idUser:any;
  private datosCompartidos:any = {};

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  setDatos_rDespacho(datos: any) {
    this.datosCompartidos = datos;
  }

  getDatos_rDespacho() {
    return this.datosCompartidos;
  }

  obtener_datos_cventas(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'cventas/'+id,{headers:headers});
  }

  // obtener_datos_dventas(id:any,token:any):Observable<any>{
  //   let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
  //   return this._http.get(this.url+'dventas/'+id,{headers:headers});
  // }

  obtener_datos_dventas_empresa(id:any, idempresa:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + `ventas/${id}/${idempresa}`, { headers: headers });
    // return this._http.get(this.url+'dventas/'+id,{headers:headers});
  }

  obtener_datos_renvios(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'envios/'+id,{headers:headers});
  }

  obtener_datos_cventas_empresa(id:any, aliasempresa: any, token:any):Observable<any>{
    console.log('aliasempresa',aliasempresa);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + `cventas/${id}/${aliasempresa}`, { headers: headers });
  }
}
