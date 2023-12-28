import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }
  
  // api.get('/presentaciones',auth.auth, presentacionController.obtener_Presentaciones);
  // api.get('/presentaciones/:id',auth.auth, presentacionController.obtener_presentacion_id);
  // api.post('/presentaciones', auth.auth, presentacionController.crear_Presentacion);
  // api.put('/presentaciones/:id',auth.auth, presentacionController.editar_presentacion);
  // api.delete('/presentaciones/:id',auth.auth, presentacionController.eliminar_presentacion);
  
  obtener_presentaciones(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'presentaciones',{headers:headers});
  }

  obtener_presentacion_id(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'presentaciones/'+id,{headers:headers});
  }

  crear_presentacion(token:any,presentacion:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'presentaciones',presentacion,{headers:headers});
  }

  actualizar_presentacion(token:any,id:any,presentacion:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'presentaciones/'+id,presentacion,{headers:headers});
  }

  eliminar_presentacion(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'presentaciones/'+id,{headers:headers});
  }
  

}
