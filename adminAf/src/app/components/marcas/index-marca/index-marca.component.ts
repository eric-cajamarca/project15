import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AdminService } from 'src/app/services/admin.service';
import { variosService } from 'src/app/services/varios.service';

@Component({
  selector: 'app-index-marca',
  templateUrl: './index-marca.component.html',
  styleUrls: ['./index-marca.component.css']
})
export class IndexMarcaComponent {
  public marcas: Array<any> = [];
  public load_estado = false;
  public token: any = '';
  
  constructor(
    private _router: Router,
    private _cookieService: CookieService,
    private _adminService: AdminService,
    private _marcaService: variosService
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    this.initData();

  }

  initData() {
    this._marcaService.obtenerMarcas(this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          console.log('No hay datos');
        } else {
          this.marcas = response.data;
        }
      },
      error => {
        console.log('Error al obtener marcas');
        console.log(<any>error);
      }
    );
  }

  set_eliminar(marca: any){
    
  }

  deleteMarca(id: number) {
    console.log('Eliminar marca con id: ', id);
  }

}
