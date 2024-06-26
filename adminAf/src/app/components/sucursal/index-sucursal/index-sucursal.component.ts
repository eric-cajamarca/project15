import { Component, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SucursalService } from 'src/app/services/sucursal.service';

declare var bootstrap: any; // Esto asume que Bootstrap está disponible globalmente

@Component({
  selector: 'app-index-sucursal',
  templateUrl: './index-sucursal.component.html',
  styleUrls: ['./index-sucursal.component.css']
})
export class IndexSucursalComponent {
  

  public sucursales: Array<any> = [];

  public token:any;
  public sucursales_const:any = {};
  public load_estado:any = false;

  constructor(
    private _sucursalcervice: SucursalService,
    private _cookieService: CookieService,
  ) { 
    this.token = this._cookieService.get('token');
    this.obtenerSucursales();
  }

  ngAfterViewInit(): void {
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
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

  actualizarEstado(id:any, estado:any){
    console.log('id: ',id);
    console.log('estado: ',estado);

    let Estado = {estado:estado};

    this._sucursalcervice.editar_estado_idsucursal(id, Estado, this.token).subscribe(
      response=>{
        console.log('response: ',response);
        this.obtenerSucursales();
      },
      error=>{
        console.log('error: ',error);
      }
    )
  }
}
