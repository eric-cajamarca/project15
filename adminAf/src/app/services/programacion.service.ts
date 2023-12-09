import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {
  public url: any;

  

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }


  obtener_all_programaciones(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'programacion',{headers:headers});
  }



}
