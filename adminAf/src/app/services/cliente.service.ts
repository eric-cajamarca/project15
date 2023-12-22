import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url: any;
  private _router: any;
  public idUser:any;
  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }


  //Metodo para obtener todos los clientes
  obtener_clientes(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'clientes',{headers:headers});
  }

  //Metodo para obtener un cliente por id
  obtener_cliente_id(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'cliente/'+id,{headers:headers});
  }

  //Metodo para crear un cliente
  crear_cliente(token:any,cliente:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'cliente',cliente,{headers:headers});
  }

  //Metodo para editar un cliente
  editar_cliente(token:any,id:any,cliente:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cliente/'+id,cliente,{headers:headers});
  }

  //Metodo para eliminar un cliente
  eliminar_cliente(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'cliente/'+id,{headers:headers});
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  //metodo para obtener direccionCliente
  obtener_direccionCliente_id(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'direccionClientes/'+id,{headers:headers});
  }

  //metodo para crear direccionCliente
  crear_direccionCliente(token:any,direccionCliente:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'direccionClientes',direccionCliente,{headers:headers});
  }

  //metodo para editar direccionCliente
  editar_direccionCliente(token:any,id:any,direccionCliente:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'direccionClientes/'+id,direccionCliente,{headers:headers});
  }

  //metodo para eliminar direccionCliente 
  eliminar_direccionCliente(token:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'direccionClientes/'+id,{headers:headers});
  }



}
