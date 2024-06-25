import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-index-sucursal',
  templateUrl: './index-sucursal.component.html',
  styleUrls: ['./index-sucursal.component.css']
})
export class IndexSucursalComponent {
  public sucursales: Array<any> = [];

  public token:any;
  public sucursales_const:any = {};

  constructor(
    private _sucursalcervice: SucursalService,
    private _cookieService: CookieService,
  ) { 
    this.token = this._cookieService.get('token');
    this.obtenerSucursales();
  }

  ngOnInit(): void {
  }

  obtenerSucursales(){
    this._sucursalcervice.obtener_sucursal_idempresa(this.token).subscribe(
      response=>{
        console.log('response: ',response.data);
        this.sucursales = response.data;
        this.sucursales_const = response.data;
        console.log('this.sucursales: ',this.sucursales);
      },
      error=>{
        console.log('error: ',error);
      }
    )
  }
}
