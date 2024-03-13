import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ComprasService } from 'src/app/services/compras.service';
import { PresentacionService } from 'src/app/services/presentacion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';

declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-compras',
  templateUrl: './index-compras.component.html',
  styleUrls: ['./index-compras.component.css']
})
export class IndexComprasComponent implements OnInit {
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
  public categoria: any = [];
  public presentacion: any = [];
  public sucursales: any = [];
  public productos: any = {};
  public productos_const: any = {};
  public detalleCompras: any = [];
  public detalleCompras_const: any = [];
  public loadDetalleCompras = false;

  
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _comprasService: ComprasService,
    private _cookieService: CookieService,
    private _sucursalService: SucursalService,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private _presentacionService: PresentacionService 
  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {

    this._categoriaService.obtener_categorias(this.token).subscribe(
      response => {
        this.categoria = response.data;
        console.log('this.categoria', this.categoria);
      },
      error => {
        console.log(error);
      }
    );

    this._presentacionService.obtener_presentaciones(this.token).subscribe(
      response => {
        this.presentacion = response.data;
        console.log('this.presentacion', this.presentacion);
      },
      error => {
        console.log(error);
      }
    );

    this._sucursalService.obtener_sucursal_idempresa(this.token).subscribe(
      response => {
        this.sucursales = response.data;
        console.log('this.sucursales', this.sucursales);
      },
      error => {
        console.log(error);
      }
    );

    this._productoService.obtener_productos_todos(this.token).subscribe(
      response => {
        console.log('response productos', response.data);
        if (response.data != undefined) {

          this.productos = response.data;

          // this.productos = response.data;
          // console.log('this.productos como objeto',this.productos);

        }
        this.productos_const = this.productos;
        console.log('this.productos', this.productos);
      },
      error => {
        console.log(error);
      }
    );

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
    this.loadDetalleCompras = true;

    //codigo para retrazar la ejecucion de la funcion
    setTimeout(() => {
      this.loadDetalleCompras = false;
    }, 3000);

    console.log('aqui consultaCompCompra', id);
    this._comprasService.obtener_detalle_compras_idcompra(id, this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data != undefined) {

          response.data.forEach((element: any) => {
            //buscar en this.productos el codigo y traer todo el objeto del codigo
            const selectedObject = this.productos.find((item: any) => item.idProducto == element.idProducto);
            element.producto = selectedObject;

            //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
            const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == element.idSucursal);
            element.sucursal = selectedObjectSucursal;

            //buscar en this.categoria el idCategoria y traer todo el objeto del idCategoria
            const selectedObjectCategoria = this.categoria.find((item: any) => item.idCategoria == element.producto.idCategoria);
            element.categoria = selectedObjectCategoria;

            //buscar en this.presentacion el idPresentacion y traer todo el objeto del idPresentacion

            const selectedObjectPresentacion = this.presentacion.find((item: any) => item.idPresentacion == element.producto.idPresentacion);
            element.presentacion = selectedObjectPresentacion;



          }
          );
          this.detalleCompras = response.data;
          this.detalleCompras_const = this.detalleCompras;


          //quiero recorrer detallecompras y modificar algunos campos
          this.detalleCompras.forEach((element: any) => {
            element.idPresentacion = element.producto.idPresentacion;
            element.idCategoria = element.producto.idCategoria;
            element.idSucursal = element.sucursal.idSucursal;
            element.cUnitario = element.pUnitario;
            element.subtotal = element.total;
            element.descripcion = element.producto.descripcion;
            element.codigo = element.producto.Codigo;
            element.fProduccion = element.producto.fProduccion;
            element.fVencimiento = element.producto.fVencimiento;
          });




          this.loadDetalleCompras = false;
          console.log('this.detalleCompras', this.detalleCompras);
        }
      },
      error => {
        console.log(error);
      }
    );



  }

  //aqui obtengo el detalle de compra por idCompra
  // this._comprasService.obtener_detalle_compras_idcompra(this.idCompra, this.token).subscribe(
  //   response => {
  //     console.log('response detalle compras', response);
  //     if (response.data != undefined) {

  //       response.data.forEach((element: any) => {
  //         //buscar en this.productos el codigo y traer todo el objeto del codigo
  //         const selectedObject = this.productos.find((item: any) => item.idProducto == element.idProducto);
  //         element.producto = selectedObject;

  //         //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
  //         const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == element.idSucursal);
  //         element.sucursal = selectedObjectSucursal;

  //         //buscar en this.categoria el idCategoria y traer todo el objeto del idCategoria
  //         const selectedObjectCategoria = this.categoria.find((item: any) => item.idCategoria == element.producto.idCategoria);
  //         element.categoria = selectedObjectCategoria;

  //         //buscar en this.presentacion el idPresentacion y traer todo el objeto del idPresentacion

  //         const selectedObjectPresentacion = this.presentacion.find((item: any) => item.idPresentacion == element.producto.idPresentacion);
  //         element.presentacion = selectedObjectPresentacion;



  //       }
  //       );
  //       this.detalleCompras = response.data;
  //       this.detalleCompras_const = this.detalleCompras;


  //       //quiero recorrer detallecompras y modificar algunos campos
  //       this.detalleCompras.forEach((element: any) => {
  //         element.idPresentacion = element.producto.idPresentacion;
  //         element.idCategoria = element.producto.idCategoria;
  //         element.idSucursal = element.sucursal.idSucursal;
  //         element.cUnitario = element.pUnitario;
  //         element.subtotal = element.total;
  //         element.descripcion = element.producto.descripcion;
  //         element.codigo = element.producto.Codigo;
  //         element.fProduccion = element.producto.fProduccion;
  //         element.fVencimiento = element.producto.fVencimiento;
  //       });




  //       this.loadDetalleCompras = false;
  //       console.log('this.detalleCompras', this.detalleCompras);
  //     }
  //   },
  //   error => {
  //     console.log(error);
  //   }
  // );
  // });



  set_eliminar(id: any) {
    console.log('aqui set_eliminar', id);
    this._comprasService.eliminar_idcompra_empresa(id, this.token).subscribe(
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
          this.initData();
          iziToast.show({
            title: 'OK',
            titleColor: '#008000',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se elimino correctamente'
          });

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
