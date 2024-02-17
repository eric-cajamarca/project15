import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent {

  public productos: Array<any> = [];
  public productos_const: Array<any> = [];
  public token: any = "";

  public page = 1;
  public pageSize = 10;
  public filtro = '';
  

  public load_estado = false;


  constructor(
    
    private _router: Router,
    private _comprasService: ComprasService,
    private _cookieService: CookieService,
    private _sucursalService: SucursalService,
    private _productoService: ProductoService,
  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    this.initData();

  }

  initData() {
    this._productoService.obtener_productos_todos(this.token).subscribe(
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
          this.productos = response.data;
          this.productos_const = response.data;
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
      this.productos = this.productos_const.filter(item => term.test(item.compCompra) || term.test(item.rSocial) || term.test(item.total) || term.test(item.fEmision) || term.test(item.descripcion));
    } else {
      this.productos = this.productos_const;
    }
  }

  consultaidProducto(id: any,) {
    // this.load_estado = true;
    



  }


  set_eliminar(id: any) {
    console.log('aqui set_eliminar', id);
    this._productoService.eliminar_producto(id, this.token).subscribe(
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
            message: 'Error al eliminar el producto'
          });
          
        } else {
          this.initData();

          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          //habilitar el scroll en el body en el componente
          $('body').css('overflow-y', 'auto');

        }
       
      },
      error => {
        console.log(error);
      }
    );




  }

}
