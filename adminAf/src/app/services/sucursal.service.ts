import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  // api.get('/sucursal',auth.auth, sucursalController.obtener_sucursal_todos);
  // api.get('/sucursal/:id',auth.auth, sucursalController.obtener_sucursal_idempresa);
  // api.post('/sucursal', auth.auth, sucursalController.crear_sucursal_idEmpresa);
  // api.put('/sucursal/:id',auth.auth, sucursalController.editar_sucursal_idEmpresa);
  // api.delete('/sucursal/:id',auth.auth, sucursalController.eliminar_sucursal_idempresa);

  // //////////////////////////////////////////////////////////////////////////////////////////
  // api.get('/stocksucursal',auth.auth, sucursalController.obtener_stock_sucursal_idProducto);

  obtener_sucursal_todos(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'sucursal',{headers:headers});
  }

  obtener_sucursal_idempresa(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'sucursalempresa',{headers:headers});
  }

  crear_sucursal_idEmpresa(token:any,sucursal:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'sucursal',sucursal,{headers:headers});
  }

  editar_sucursal_idEmpresa(token:any,id:any,sucursal:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'sucursal/'+id,sucursal,{headers:headers});
  }

  eliminar_sucursal_idempresa(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'sucursal/'+id,{headers:headers});
  }

  //////////////////////////////////////////////////////////////////////////////////////////
// api.get('/stocksucursal',auth.auth, sucursalController.obtener_stock_sucursal_idProducto);
// api.get('/stocksucursales/',auth.auth, sucursalController.obtener_stock_sucursales_idempresa);
// api.post('/stocksucursal', auth.auth, sucursalController.crear_stock_sucursal_idEmpresa);
// api.put('/stocksucursal/:id',auth.auth, sucursalController.editar_stock_sucursal);
// api.delete('/stocksucursal/:id',auth.auth, sucursalController.eliminar_stock_sucursal);

  obtener_stock_sucursal_idProducto(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'stocksucursal/'+id,{headers:headers});
  }

  obtener_stock_sucursales_idempresa(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'stocksucursales/',{headers:headers});
  }

  crear_stock_sucursal_idEmpresa(stock:any, token:any,):Observable<any>{
    console.log('stock',stock);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'stocksucursal',stock,{headers:headers});
  }

  editar_stock_sucursal(id:any,stock:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'stocksucursal/'+id,stock,{headers:headers});
  }

  eliminar_stock_sucursal(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'stocksucursal/'+id,{headers:headers});
  }

}
