import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { PresentacionService } from 'src/app/services/presentacion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { TablasSunatService } from 'src/app/services/tablas-sunat.service';

@Component({
  selector: 'app-create-compras',
  templateUrl: './create-compras.component.html',
  styleUrls: ['./create-compras.component.css']
})
export class CreateComprasComponent implements OnInit {

  public compras: any = {
    idEmpresa: '',
    idSucursal: '',
    idComprobante: '',
    idCliente: '',
    idDocumento: '',
    idMoneda: '',
    idEstadoPago: '',
    idMedioPago: '',
    fechaEmision: '',
    fechaPago: '',
    total: 0,
    observacion: '',

  };
  public detalleCompras: any = [];
  public comprobantes: any = [];
  public clientes: any = {};
  public productos: any = {};
  public productos_const: any = {};
  public sucursales: any = {};
  public stockSucursales: any = [];
  public filtro: any = {};
  public filtroConsulta: any = '';
  public documento: any = {};
  public moneda: any = [];
  public estadoPago: any = [];
  public mediosPago: any = [];
  public categoria: any = [];
  public presentacion: any = {};
  public nuevoProducto: any = {
    idProducto: '',
    codigo: '',
    descripcion: '',
    cUnitario: 0,
    cantidad: 0,
    subtotal: 0,
    categoria: {},
    presentacion: {},
    sucursal: {},
    useCorrelativo: false
  };
  public correlativo: any = '';
  //public useCorrelativo: { checked: boolean; } | undefined;

  public token: any;


  constructor(
    private _cookieService: CookieService,
    private _comprasService: ComprasService,
    private _comprobanteService: ComprobanteService,
    private _clientesService: ClienteService,
    private _productoService: ProductoService,
    private _sucursalService: SucursalService,
    private _documentoService: DocumentoService,
    private _tablasSunatService: TablasSunatService,
    private _categoriaService: CategoriaService,
    private _presentacionService: PresentacionService

  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    this.initData();

  }

  initData() {

    this._comprobanteService.obtener_comprobantes(this.token).subscribe(
      response => {
        this.comprobantes = response.data;
        console.log(this.comprobantes);
      },
      error => {
        console.log(error);
      }
    );

    this._tablasSunatService.obtener_moneda(this.token).subscribe(
      response => {
        this.moneda = response.data;
        console.log(this.moneda);
      },
      error => {
        console.log(error);
      }
    );

    this._tablasSunatService.obtener_estado_pago(this.token).subscribe(
      response => {
        this.estadoPago = response.data;
        console.log(this.estadoPago);
      },
      error => {
        console.log(error);
      }
    );

    this._tablasSunatService.obtener_medios_pago(this.token).subscribe(
      response => {
        this.mediosPago = response.data;
        console.log(this.mediosPago);
      },
      error => {
        console.log(error);
      }
    );

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

    this._comprasService.obtener_correlativo_empresa(this.token).subscribe(
      response => {
        this.correlativo = response.data[0];

        console.log('this.correlativo', this.correlativo);
      },
      error => {
        console.log(error);
      }
    );

    this._sucursalService.obtener_stock_sucursales_idempresa(this.token).subscribe(
      response => {
        if (response.data != undefined) {
          //quiero buscar en response.data el idProducto y traer todo el objeto del idProducto y agregarlo a this.stockSucursales
          this.stockSucursales = response.data;
          this.stockSucursales.forEach((element: any) => {
            //buscar en this.productos el codigo y traer todo el objeto del codigo
            const selectedObject = this.productos.find((item: any) => item.idProducto == element.idProducto);
            element.producto = selectedObject;
            // Ahora, selectedObject contiene toda la información del elemento seleccionado
            //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
            const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == element.idSucursal);
            element.sucursal = selectedObjectSucursal;



          });


          console.log('this.stockSucursales', this.stockSucursales);
        }
      },
      error => {
        console.log(error);
      }
    );


  }

  buscar() {
    console.log('this.filtro', this.filtro);
    console.log('this.clientes.ruc', this.compras.ruc);

    this._clientesService.obtener_cliente_ruc(this.compras.ruc, this.token).subscribe(
      response => {
        this.clientes = response.data[0];
        this.compras.idCliente = this.clientes.idCliente;
        console.log(this.clientes);
      },
      error => {
        console.log(error);
      }
    );
  }


  quitar(idx: any, subtotal: any) {
    this.detalleCompras.splice(idx, 1);
    this.compras.total = this.compras.total - subtotal;
  }

  seleccionar(idx: any) {
    this.nuevoProducto.codigo = this.productos[idx].Codigo;
   // this.nuevoProducto.idSucursal = this.productos[idx].sucursal;
    
    //console.log('this.nuevoProducto.idSucursal', this.productos[idx]);
    //buscar en this.productos el codigo y traer todo el objeto del codigo
    const selectedObject = this.productos.find((item: any) => item.Codigo == this.nuevoProducto.codigo);

    //this.nuevoProducto = selectedObject;
    console.log('selectedObject', selectedObject);
    this.nuevoProducto.codigo = selectedObject.Codigo;
    this.nuevoProducto.idCategoria = selectedObject.idCategoria[0];
    this.nuevoProducto.descripcion = selectedObject.descripcion;
    this.nuevoProducto.idPresentacion = selectedObject.idPresentacion[0];
    this.nuevoProducto.cUnitario = selectedObject.cUnitario;
    this.nuevoProducto.cantidad = 1;
    this.nuevoProducto.fProduccion = selectedObject.fProduccion;
    this.nuevoProducto.fVencimiento = selectedObject.fVencimiento;
    this.nuevoProducto.idSucursal = selectedObject.idSucursal[0];

    this.nuevoProducto.useCorrelativo = false;

  }


  buscarDescripcion() {
    console.log('this.filtroConsulta', this.filtroConsulta);

    if (this.filtroConsulta) {
      //
      var term = new RegExp(this.filtroConsulta, 'i');
      this.productos = this.productos_const.filter((item: { descripcion: string; Codigo: string; }) => term.test(item.descripcion) || term.test(item.Codigo));
      console.log('this.productos despues de la busqueda', this.productos);
    }
    // else {
    //   this.productos = this.productos_const;
    // }
  }

  // onInputRuc(){
  //   const selectedObject = this.clientes.find((item: any) => item.ruc == this.clientes.ruc);
  //   this.compras.cliente = selectedObject;
  //   // Ahora, selectedObject contiene toda la información del elemento seleccionado
  //   console.log('selectedObject',selectedObject);
  //   console.log('this.compras',this.compras);
  // }

  // onSelectMoneda(){
  //   const selectedObject = this.moneda.find((item: any) => item.idMoneda == this.compras.idMoneda);
  //   this.compras.idMoneda = selectedObject;
  //   // Ahora, selectedObject contiene toda la información del elemento seleccionado
  //   console.log('selectedObject',selectedObject);
  //   console.log('this.compras',this.compras);
  // }

  // onSelectComprobante(){
  //   const selectedObject = this.comprobantes.find((item: any) => item.idComprobante == this.compras.idComprobante);
  //   this.compras.idComprobante = selectedObject;
  //   // Ahora, selectedObject contiene toda la información del elemento seleccionado
  //   console.log('selectedObject',selectedObject);
  //   console.log('this.compras',this.compras);
  // }

  onSelectPresentacion(selectedValue: any) {

    const selectedObject = this.presentacion.find((item: any) => item.idPresentacion == selectedValue);
    this.nuevoProducto.presentacion = selectedObject;
    // Ahora, selectedObject contiene toda la información del elemento seleccionado
    console.log('selectedObject', selectedObject);
    console.log('this.nuevoProducto', this.nuevoProducto);

  }

  onSelectCategoria(selectedValue: any) {

    const selectedObject = this.categoria.find((item: any) => item.idCategoria == selectedValue);
    this.nuevoProducto.categoria = selectedObject;
    // Ahora, selectedObject contiene toda la información del elemento seleccionado
    console.log('selectedObject', selectedObject);
    console.log('this.nuevoProducto', this.nuevoProducto);

  }

  onSelectSucursal(selectedValue: any) {
    const selectedObject = this.sucursales.find((item: any) => item.idSucursal == selectedValue);
    this.nuevoProducto.sucursal = selectedObject;
    // Ahora, selectedObject contiene toda la información del elemento seleccionado
    console.log('selectedObject', selectedObject);
    console.log('this.nuevoProducto', this.nuevoProducto);
  }

  onCheckboxChange() {
    if (this.nuevoProducto.useCorrelativo) {

      console.log('El checkbox está marcado.', this.nuevoProducto.useCorrelativo);

      // Realiza acciones cuando el checkbox está marcado

      this.nuevoProducto.codigo = this.correlativo.numero;

    } else {
      console.log('El checkbox está desmarcado.', this.nuevoProducto.useCorrelativo);
      // Realiza acciones cuando el checkbox NO está marcado
      this.nuevoProducto.codigo = '';
    }

  }

  agregarProductoNuevo() {
    //deseo multiplicar el precio por la cantidad de this.nuevoProducto
    this.nuevoProducto.subtotal = this.nuevoProducto.cUnitario * this.nuevoProducto.cantidad;

    this.detalleCompras.push(this.nuevoProducto);
    console.log('this.detalleCompras', this.detalleCompras);

    //deseo recorrer detalleCompras y sumar el subtotal y guardarlo en this.compras.total
    this.compras.subTotal = 0;
    this.detalleCompras.forEach((element: any) => {
      this.compras.subTotal = this.compras.subTotal + element.subtotal;
    });


    this.nuevoProducto = {};
    this.correlativo.numero = this.correlativo.numero + 1;
    this.sumarFooterFactura();



  }

  sumarFooterFactura() {

    this.compras.igv = 0;
    this.compras.exonerado = 0;
    this.compras.gratuito = 0;
    this.compras.descuentos = 0;
    this.compras.otrosCargos = 0;
    this.compras.total = 0;

    this.compras.total = (this.compras.subTotal + this.compras.igv + this.compras.otrosCargos) - this.compras.descuentos;

    console.log('this.compras', this.compras);
  }

  onInput() {
    this.compras.total = (this.compras.subTotal + this.compras.igv + this.compras.otrosCargos) - this.compras.descuentos;

  }

  registrarCompras() {
    console.log('this.compras', this.compras);
    console.log('this.detalleCompras', this.detalleCompras);

    // this._comprasService.crear_compra(this.token,this.compras).subscribe(
    //   response => {
    //     console.log('response',response);
    //     if (response.status == 'success') {
    //       this._comprasService.obtener_compra_idempresa(this.token).subscribe(
    //         response => {
    //           console.log('response',response);
    //           if (response.status == 'success') {
    //             this.detalleCompras.forEach((element: any) => {
    //               element.idCompra = response.data[0].idCompra;
    //               this._comprasService.crear_detalle_compras_idcompra(this.token,element).subscribe(
    //                 response => {
    //                   console.log('response',response);
    //                   if (response.status == 'success') {
    //                     this._comprasService.obtener_detalle_compras_idcompra(this.token,element.idCompra).subscribe(
    //                       response => {
    //                         console.log('response',response);
    //                         if (response.status == 'success') {
    //                           this.stockSucursales = response.data;
    //                           this.stockSucursales.forEach((element: any) => {
    //                             element.stock = element.stock + element.cantidad;
    //                             this._comprasService.editar_detalle_compras_idcompra(this.token,element.idDetalleCompra,element).subscribe(
    //                               response => {
    //                                 console.log('response',response);
    //                                 if (response.status == 'success') {

    //                                 }
    //                               },
    //                               error => {
    //                                 console.log(error);
    //                               }
    //                             );
    //                           });

    //                         }
    //                       },
    //                       error => {
    //                         console.log(error);
    //                       }
    //                     );
    //                   }
    //                 },
    //                 error => {
    //                   console.log(error);
    //                 }
    //               );
    //             });

    //           }
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

}
