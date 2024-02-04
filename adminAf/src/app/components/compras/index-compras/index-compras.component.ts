import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { ComprasService } from 'src/app/services/compras.service';
import { SucursalService } from 'src/app/services/sucursal.service';

declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-compras',
  templateUrl: './index-compras.component.html',
  styleUrls: ['./index-compras.component.css']
})
export class IndexComprasComponent implements OnInit{
  public clientes: Array<any> = [];
  public clientes_const: Array<any> = [];
  public token: any = "";

  public page = 1;
  public pageSize = 10;
  public filtro = '';
  public compras: Array<any> = [];
  public compras_const: Array<any> = [];
  public detCompras: Array<any> = [];

  public load_estado = false;


  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _comprasService: ComprasService,
    private _cookieService: CookieService,
    private _sucursalService: SucursalService,
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    this.initData();
    
  }

  initData() {
    this._comprasService.obtener_compras_todos(this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Usted no tiene acceso a compras'
          });
          this._router.navigate(['/']);
        } else {
          this.compras = response.data;
          this.compras_const = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  filtrar() {
    if (this.filtro) {
      //
      var term = new RegExp(this.filtro, 'i');
      this.compras = this.compras_const.filter(item => term.test(item.compCompra) || term.test(item.rSocial) || term.test(item.total) || term.test(item.fEmision) || term.test(item.descripcion));
    } else {
      this.compras = this.compras_const;
    }
  }

  consultaCompCompra(id: any,) {
    // this.load_estado = true;
    console.log('aqui consultaCompCompra', id);
    this._comprasService.obtener_detalle_compras_idcompra(id, this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Usted no tiene acceso a compras'
          });
          
        } else {
          this.detCompras = response.data;
          
        }
      },
      error => {
        console.log(error);
      }
    );

    
    
  }


  set_eliminar(id: any) {
    console.log('aqui set_eliminar', id);

    

    
  }
}
