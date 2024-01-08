import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

    //   api.get('/compras',auth.auth, comprasController.obtener_compras_todos);
    // api.get('/compras/:id',auth.auth, comprasController.obtener_compras_id);

    // api.get('/comprasempresa/:id',auth.auth, comprasController.obtener_compras_idCompra_idEmpresa);
    // api.get('/comprasempresa',auth.auth, comprasController.obtener_compras_todos_idEmpresa);

    // api.post('/compras', auth.auth, comprasController.crear_compra);
    // api.put('/compras/:id',auth.auth, comprasController.actualizar_compra);


    // ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // api.get('/borradorcompras',auth.auth, comprasController.obtener_borrador_compras_empresa);
    // api.post('/borradorcompras', auth.auth, comprasController.crear_borrador_compras_empresa);
    // api.put('/borradorcompras/:id',auth.auth, comprasController.editar_borrador_compras_empresa);
    //api.delete('/borradorcompras/:id',auth.auth, comprasController.eliminar_borrador_compras_empresa);


    obtener_compras_todos(token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'compras',{headers:headers});
      
    }

    obtener_compras_id(id:any, token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'compras/'+id,{headers:headers});
    }

    obtener_compras_idCompra_idEmpresa(id:any, token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'comprasempresa/'+id,{headers:headers});
    }

    obtener_compras_todos_idEmpresa(token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'comprasempresa',{headers:headers});
    }

    crear_compra(compra:any, token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.post(this.url+'compras',compra,{headers:headers});
    }

    editar_compra(token:any,id:any,compra:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'compras/'+id,compra,{headers:headers});
    }

    // ////////////////////////////////////////////////////////////////////////////////////////////////////////
    obtener_borrador_compras_empresa(token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'borradorcompras',{headers:headers});
    }

    crear_borrador_compras_empresa(token:any,compra:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.post(this.url+'borradorcompras',compra,{headers:headers});
    }

    editar_borrador_compras_empresa(token:any,id:any,compra:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'borradorcompras/'+id,compra,{headers:headers});
    }

    eliminar_borrador_compras_empresa(token:any,id:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.delete(this.url+'borradorcompras/'+id,{headers:headers});
    }

    /////////////////////////////////////////////////////////////////////////////
    // api.get('/dcompras/:id',auth.auth, dcomprasController.obtener_detalle_compras_idcompra);
    // api.post('/dcompras', auth.auth, dcomprasController.crear_detalle_compras_idcompra);
    // api.put('/dcompras/:id',auth.auth, dcomprasController.editar_detalle_compras_idcompra);

    obtener_detalle_compras_idcompra(token:any,id:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'dcompras/'+id,{headers:headers});
    }

    crear_detalle_compras_idcompra(dcompra:any , token:any,):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.post(this.url+'dcompras',dcompra,{headers:headers});
    }

    editar_detalle_compras_idcompra(token:any,id:any,dcompra:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'dcompras/'+id,dcompra,{headers:headers});
    }

    /////////////////////////////////////////////////////////////////////////////
    // api.get('/correlativos',auth.auth, comprasController.obtener_correlativos_empresa);
    // api.put('/correlativos/:id',auth.auth, comprasController.editar_correlativos_empresa);

    obtener_correlativo_empresa(token:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.get(this.url+'correlativos',{headers:headers});
    }

    editar_correlativos_empresa(token:any,id:any,correlativo:any):Observable<any>{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'correlativos/'+id,correlativo,{headers:headers});
    }

}
