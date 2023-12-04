import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DventaService {

  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }



  obtener_datos_dventas_empresa(id:any, idempresa:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + `ventas/${id}/${idempresa}`, { headers: headers });
    // return this._http.get(this.url+'dventas/'+id,{headers:headers});
  }

  actualizar_CEntrega_DVentas(id:any, data:any,token:any):Observable<any>{
    console.log('id',id,'data:',data)
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'ventas/'+id,data,{headers:headers});
  }
}
