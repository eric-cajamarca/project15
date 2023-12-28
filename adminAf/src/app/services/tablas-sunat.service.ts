import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TablasSunatService {
  public url: any;
  private _router: any;
  public idUser: any;


  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }



 

  //   api.get('/estadopago',auth.auth, tablasSunatController.obtener_estado_pago);
  // api.get('/mediospago',auth.auth, tablasSunatController.obtener_medios_pago);
  // api.get('/estadosunat',auth.auth, tablasSunatController.obtener_estado_sunat);
  // api.get('/moneda',auth.auth, tablasSunatController.obtener_moneda);
  // api.get('/leyenda',auth.auth, tablasSunatController.obtener_leyenda);
  // api.get('/tipodoc',auth.auth, tablasSunatController.obtener_tipo_doc);
  // api.get('/tipooperacion',auth.auth, tablasSunatController.obtener_tipo_operacion);
  // api.get('/modalidadtraslado',auth.auth, tablasSunatController.obtener_modalidad_traslado);
  // api.get('/motivostraslado',auth.auth, tablasSunatController.obtener_motivos_traslado);
  // api.get('/tipofactura',auth.auth, tablasSunatController.obtener_tipo_factura);
  // api.get('/regimenpercepcion',auth.auth, tablasSunatController.obtener_regimen_percepcion);
  // api.get('/regimenretencion',auth.auth, tablasSunatController.obtener_regimen_retencion);
  // api.get('/tributos',auth.auth, tablasSunatController.obtener_tributos);

  obtener_estado_pago(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'estadopago', { headers: headers });
  }

  obtener_medios_pago(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'mediospago', { headers: headers });
  }

  obtener_estado_sunat(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'estadosunat', { headers: headers });
  }

  obtener_moneda(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'moneda', { headers: headers });
  }
  
  obtener_leyenda(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'leyenda', { headers: headers });
  }

  obtener_tipo_doc(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'tipodoc', { headers: headers });
  }

  obtener_tipo_operacion(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'tipooperacion', { headers: headers });
  }

  obtener_modalidad_traslado(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'modalidadtraslado', { headers: headers });
  }

  obtener_motivos_traslado(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'motivostraslado', { headers: headers });
  }

  obtener_tipo_factura(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + '/tipofactura', { headers: headers });
  }

  obtener_regimen_percepcion(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url +'regimenpercepcion', { headers: headers });
  }

  obtener_regimen_retencion(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get( this.url +'regimenretencion', { headers: headers });
  }

  obtener_tributos(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get( this.url +'tributos', { headers: headers });
  }


}