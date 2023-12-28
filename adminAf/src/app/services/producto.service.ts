import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

    // api.get('/productos',auth.auth, productosController.obtener_productos_todos);
  // api.get('/productos/:id',auth.auth, productosController.obtener_productos_id);
  // api.post('/productos', auth.auth, productosController.crear_producto);
  // api.put('/productos/:id',auth.auth, productosController.actualizar_producto);


  obtener_productos_todos(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'productos',{headers:headers});
  }

  obtener_productos_id(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'productos/'+id,{headers:headers});
  }

  crear_producto(token:any,producto:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'productos',producto,{headers:headers});
  }

  actualizar_producto(token:any,id:any,producto:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'productos/'+id,producto,{headers:headers});
  }
  
}
