import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  // api.get('/categorias',auth.auth, categoriaController.obtener_Categorias);
  // api.get('/categoriasempresa',auth.auth, categoriaController.obtener_Categorias_idEmpresa);
  // api.get('/categorias/:id',auth.auth, categoriaController.obtener_Categoria_id);
  // api.get('/categoriasempresa/:id',auth.auth, categoriaController.obtener_Categoria_id_idempresa);
  // api.post('/categorias', auth.auth, categoriaController.crear_Categoria);
  // api.put('/categorias/:id',auth.auth, categoriaController.editar_Categoria);
  // api.delete('/categorias/:id',auth.auth, categoriaController.eliminar_Categoria);

  obtener_categorias(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'categorias',{headers:headers});
  }

  obtener_categorias_idEmpresa(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'categoriasempresa/'+id,{headers:headers});
  }

  obtener_categoria_id(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'categorias/'+id,{headers:headers});
  }

  obtener_categoria_id_idempresa(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'categoriasempresa/'+id,{headers:headers});
  }

  crear_categoria(data:any , token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url + 'categorias', data,{headers:headers});
    
  }

  editar_categoria(id:any,categoria:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'categorias/'+id,categoria,{headers:headers});
  }

  eliminar_categoria(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'categorias/'+id,{headers:headers});
  }
  
}
