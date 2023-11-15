import { Injectable } from '@angular/core';
import {GLOBAL} from "./GLOBAL";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

   admin_login(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'admin_login',data,{headers:headers});
   }

   gettoken(){
    return localStorage.getItem('token');
   }
}
