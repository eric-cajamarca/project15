
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

  
 

  obtener_datos_renvios(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'envios/'+id,{headers:headers});
  }

  
 
}
