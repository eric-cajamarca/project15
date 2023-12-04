import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CventaService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }


  obtener_datos_cventas(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'cventas/'+id,{headers:headers});
  }

  obtener_datos_cventas_empresa(id:any, aliasempresa:any, token:any):Observable<any>{
    console.log('aliasempresa',aliasempresa);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + `cventas/${id}/${aliasempresa}`, { headers: headers });
  }

}
