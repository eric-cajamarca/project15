import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public url: any;
  private _router: any;
  public idUser:any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  getEmpresas(token:any):Observable<any>{
    
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url +'empresa',{headers:headers});
  }

  getEmpresas_id(id:any,token:any):Observable<any>{
    
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'empresa/'+id,{headers:headers});
  }

  // api.post('/empresa',auth.auth, empresasController.createEmpresa);
  // api.put('/empresa/:id',auth.auth, empresasController.updateEmpresa);

  createEmpresa(empresa:any,token:any):Observable<any>{
    let params = JSON.stringify(empresa);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'empresa',params,{headers:headers});
  }

  updateEmpresa(empresa:any,token:any):Observable<any>{
    let params = JSON.stringify(empresa);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'empresa/'+empresa._id,params,{headers:headers});
  }

  //api.put('/cambiar_estado_empresa/:id',auth.auth, empresasController.cambiar_estado_empresa);
  cambiar_estado_empresa(id:any,estado:any,token:any):Observable<any>{
    let params = JSON.stringify({estado:estado});
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_estado_empresa/'+id,params,{headers:headers});
  }

  // api.get('/direccion_empresa/:id',auth.auth, empresasController.getDireccionEmpresa_id);
  // api.post('/direccion_empresa',auth.auth, empresasController.createDireccionEmpresa);
  // api.put('/direccion_empresa/:id',auth.auth, empresasController.updateDireccionEmpresa);

  getDireccionEmpresa_id(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'direccion_empresa/'+id,{headers:headers});
  }

  createDireccionEmpresa(direccion:any,token:any):Observable<any>{
    let params = JSON.stringify(direccion);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'direccion_empresa',params,{headers:headers});
  }

  updateDireccionEmpresa(direccion:any,token:any):Observable<any>{
    let params = JSON.stringify(direccion);
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'direccion_empresa/'+direccion._id,params,{headers:headers});
  }
  


}
