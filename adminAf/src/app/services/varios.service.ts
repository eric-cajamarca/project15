import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./GLOBAL";
import { Observable } from "rxjs/internal/Observable";


@Injectable({
    providedIn: 'root'
})


export class variosService {
    public url: any;
    private _router: any;
    public idUser: any;


    constructor(
        private _http: HttpClient,
    ) {
        this.url = GLOBAL.url;
    }

        // Rutas para el CRUD de marca
        // api.get('/marcas', auth.auth, marcaController.obtenerMarcas);
        // api.post('/marcas', auth.auth, marcaController.crearMarca);
        // api.put('/marcas/:id', auth.auth, marcaController.editarMarca);
        // api.put('/marcasestado/:id', auth.auth, marcaController.editarEstadoMarca);

    obtenerMarcas(token: any): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.get(this.url + 'marcas', { headers: headers });
    }

    crearMarca(marca: any, token: any): Observable<any> {
        let params = JSON.stringify(marca);
        console.log('marca.id', marca._id);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.post(this.url + 'marcas', params, { headers: headers });
    }

    editarMarca(marca: any, token: any): Observable<any> {
        let params = JSON.stringify(marca);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.put(this.url + 'marcas/' + marca._id, params, { headers: headers });
    }

    editarEstadoMarca(marca: any, token: any): Observable<any> {
        let params = JSON.stringify(marca);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.put(this.url + 'marcasestado/' + marca._id, params, { headers: headers });
    }

    // Rutas para el CRUD de unidporcaja
    // api.get('/unidporcaja',auth.auth, unidporcajaController.obtenerUnidPorCaja);
    // api.put('/unidporcaja/:id',auth.auth, unidporcajaController.editarUnidPorCaja);

    obtenerUnidPorCaja(token: any): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.get(this.url + 'unidporcaja', { headers: headers });
    }

    editarUnidPorCaja(unidporcaja: any, token: any): Observable<any> {
        let params = JSON.stringify(unidporcaja);
        console.log('unidporcaja', unidporcaja._id);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.put(this.url + 'unidporcaja/' + unidporcaja._id, params, { headers: headers });
    }

}