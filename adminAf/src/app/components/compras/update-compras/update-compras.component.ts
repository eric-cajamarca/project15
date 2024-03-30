import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-update-compras',
  templateUrl: './update-compras.component.html',
  styleUrls: ['./update-compras.component.css']
})
export class UpdateComprasComponent {
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
  public compras_const: any = {};
  public idCompra: any = '';
  public detalleCompras: any = [];
  public detalleCompras_const: any = [];
  public nuevoDetalleCompra: any = {};
  public comprobantes: any = [];
  public clientes: any = {};
  public productos: any = {};

  public prodSelecionado: any = {};
  public productos_const: any = {};
  public sucursales: any = [];
  public stockSucursales: any = [];
  public stockSucursales_const: any = [];
  public filtro: any = {};
  public filtroConsulta: any = '';
  public documento: any = [];
  public moneda: any = [];
  public estadoPago: any = [];
  public mediosPago: any = [];
  public categoria: any = [];
  public presentacion: any = [];
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
    useCorrelativo: false,
    ubicacion: '',
    fproduccion: new Date(),
    fvencimiento: new Date(),
  };
  public correlativo: any = '';
  // FORMATO_FECHA = FORMATO_FECHA;
  public loadCompras: boolean = true;
  public loadActualizarCompras: boolean = false;
  // public prodEliminado: any = [];
  // public idProductoEliminar: any ={};
  public token: any;
  public editardetalle: boolean = false;
  public updateDetalleCompra: any = 0;
  public updatecompra: any = 0;


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
    private _presentacionService: PresentacionService,
    private _route: ActivatedRoute

  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {

    this.initData();

    this.loadCompras = true;
    this._route.params.subscribe(params => {
      console.log('params', params);
      this.idCompra = params['id'];
      console.log('this.idCompra', this.idCompra);

      //aqui obtengo la compra por id
      this._comprasService.obtener_compras_id(this.idCompra, this.token).subscribe(
        response => {
          console.log('response', response);
          if (response.data != undefined) {
            this.compras = response.data[0];
            this.compras_const = this.compras;
            console.log('this.compras', this.compras);
          }
          this.loadCompras = false;
        },
        error => {
          console.log(error);
        }
      );

      //aqui obtengo el detalle de compra por idCompra
      this._comprasService.obtener_detalle_compras_idcompra(this.idCompra, this.token).subscribe(
        response => {
          console.log('response detalle compras', response);
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




            this.loadCompras = false;
            console.log('this.detalleCompras', this.detalleCompras);
          }
        },
        error => {
          console.log(error);
        }
      );
    });

    // this.initData();

  }

  initData() {

    this.updateDetalleCompra = 0;
    this.updatecompra = 0;

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
        this.stockSucursales = response.data;
        if (response.data != undefined) {
          if (this.productos && this.sucursales && this.categoria && this.presentacion && this.stockSucursales) {
            // Realizar operaciones con los arrays
            console.log('this.productos', this.productos);
            console.log('this.sucursales', this.sucursales);
            console.log('this.categoria', this.categoria);
            console.log('this.presentacion', this.presentacion);
            console.log('this.stockSucursales', this.stockSucursales);

            //quiero buscar en response.data el idProducto y traer todo el objeto del idProducto y agregarlo a this.stockSucursales

            this.stockSucursales.forEach((element: any) => {
              //buscar en this.productos el codigo y traer todo el objeto del codigo
              const selectedObject = this.productos.find((item: any) => item.idProducto == element.idProducto);
              element.producto = selectedObject;
              // Ahora, selectedObject contiene toda la información del elemento seleccionado
              //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
              const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == element.idSucursal);
              element.sucursal = selectedObjectSucursal;

              //buscar en this.categoria el idCategoria y traer todo el objeto del idCategoria
              const selectedObjectCategoria = this.categoria.find((item: any) => item.idCategoria == element.producto.idCategoria);
              element.categoria = selectedObjectCategoria;

              //buscar en this.presentacion el idPresentacion y traer todo el objeto del idPresentacion
              const selectedObjectPresentacion = this.presentacion.find((item: any) => item.idPresentacion == element.producto.idPresentacion);
              element.presentacion = selectedObjectPresentacion;



            });
          } else {
            console.error('Uno de los arrays es undefined o está vacío.');
          }


          this.stockSucursales_const = this.stockSucursales;
          console.log('this.stockSucursales', this.stockSucursales);
        } else {
          this.stockSucursales = [];
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
        if (response.data && response.data.length > 0) {

          this.clientes = response.data[0];
          this.compras.idCliente = this.clientes.idCliente;
          this.compras.idDocumento = this.clientes.idDocumento;
          console.log("clientes", this.clientes);
        } else {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El cliente no existe.'
          });
        }
      },
      // error => {
      //   console.log(error);
      // }
    );
  }


  quitar(idx: any, subtotal: any) {
    if (idx >= 0 && idx < this.detalleCompras.length) {
      console.log('idx', idx);
      //quiero agregar al objeto this.prodEliminado los idProducto de los productos que se eliminen eliminar

      this.detalleCompras.splice(idx, 1);
      this.compras.total = this.compras.total - subtotal;

    }
  }

  seleccionar(idx: number) {
    //quiero agregar a this.nuevoProducto el objeto seleccionado
    if (idx >= 0 && idx < this.stockSucursales.length) {

      this.prodSelecionado = this.stockSucursales[idx];
      console.log('this.prodSelecionado', this.prodSelecionado);

      this.nuevoProducto.idProducto = this.prodSelecionado.idProducto;
      this.nuevoProducto.codigo = this.prodSelecionado.producto.Codigo;
      this.nuevoProducto.descripcion = this.prodSelecionado.producto.descripcion;
      this.nuevoProducto.cUnitario = this.prodSelecionado.producto.cUnitario;
      this.nuevoProducto.idCategoria = this.prodSelecionado.producto.idCategoria;
      this.nuevoProducto.idPresentacion = this.prodSelecionado.producto.idPresentacion;
      this.nuevoProducto.idSucursal = this.prodSelecionado.idSucursal;
      this.nuevoProducto.cantidad = 0;
      this.nuevoProducto.cantidadAnterior = this.prodSelecionado.cantidad;
      this.nuevoProducto.ubicacion = this.prodSelecionado.ubicacion;
      this.nuevoProducto.idStockSucursal = this.prodSelecionado.idStockSucursal;
      this.nuevoProducto.idEmpresa = this.prodSelecionado.idEmpresa;

      this.nuevoProducto.fProduccion = this.prodSelecionado.producto.fProduccion;
      //quiero convertir la fecha de produccion a string en formato yyyy-mm-dd



      this.nuevoProducto.fVencimiento = this.prodSelecionado.producto.fVencimiento;
    }




    console.log('this.nuevoProducto', this.nuevoProducto);

  }


  seleccionarDetalle(idx: number) {
    this.editardetalle = true;

    if (idx >= 0 && idx < this.detalleCompras.length) {

      this.prodSelecionado = this.detalleCompras[idx];
      console.log('this.prodSelecionado', this.prodSelecionado);

      this.nuevoProducto.idProducto = this.prodSelecionado.idProducto;
      this.nuevoProducto.codigo = this.prodSelecionado.producto.Codigo;
      this.nuevoProducto.descripcion = this.prodSelecionado.producto.descripcion;
      this.nuevoProducto.cUnitario = this.prodSelecionado.producto.cUnitario;
      this.nuevoProducto.idCategoria = this.prodSelecionado.producto.idCategoria;
      this.nuevoProducto.idPresentacion = this.prodSelecionado.producto.idPresentacion;
      this.nuevoProducto.idSucursal = this.prodSelecionado.idSucursal;
      this.nuevoProducto.cantidad = this.prodSelecionado.cantidad;
      this.nuevoProducto.cantidadAnterior = this.prodSelecionado.cantidad;
      this.nuevoProducto.ubicacion = this.prodSelecionado.ubicacion;
      this.nuevoProducto.idStockSucursal = this.prodSelecionado.idStockSucursal;
      this.nuevoProducto.idEmpresa = this.prodSelecionado.idEmpresa;

      this.nuevoProducto.fProduccion = this.prodSelecionado.producto.fProduccion;
      //quiero convertir la fecha de produccion a string en formato yyyy-mm-dd



      this.nuevoProducto.fVencimiento = this.prodSelecionado.producto.fVencimiento;
    }




    console.log('this.nuevoProducto', this.nuevoProducto);

  }



  buscarDescripcion() {
    console.log('this.filtroConsulta', this.filtroConsulta);

    if (this.filtroConsulta) {
      // quiero bucar en this.stockSucursales el codigo o la descripcion que coincida con this.filtroConsulta
      var term = new RegExp(this.filtroConsulta, 'i');
      this.stockSucursales = this.stockSucursales_const.filter((item: { producto: { descripcion: string; Codigo: string; }; }) => term.test(item.producto.descripcion) || term.test(item.producto.Codigo));
      console.log('this.productos despues de la busqueda', this.stockSucursales);

      //
      // var term = new RegExp(this.filtroConsulta, 'i');
      // this.stockSucursales = this.stockSucursales_const.filter((item: { descripcion: string; Codigo: string; }) => term.test(item.descripcion) || term.test(item.Codigo));
      // console.log('this.productos despues de la busqueda', this.stockSucursales);
    }
    else {
      this.stockSucursales = this.stockSucursales_const;
    }
  }

  onInputChangesCompCompras() {
    this.compras.compCompra = this.compras.serie + '-' + this.compras.numero;
    console.log('ejecuto una funcion onInputChangesCompCompras');
    console.log('this.compras.compCompra', this.compras.compCompra);
    console.log('this.compras.idCliente', this.compras.idCliente);

    let idCliente = {};
    idCliente = this.compras.idCliente;

    this._comprasService.buscar_comprobante_idCliente(idCliente, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          console.log('response.data', response.data);

          //quiero buscar this.compras.compCompra en response.data y si existe mostrar un mensaje que el comprobante ya existe
          const selectedObject = response.data.find((item: any) => item.compCompra == this.compras.compCompra);
          console.log('selectedObject', selectedObject);
          if (selectedObject) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'El comprobante ya existe.'
            });
            this.compras.numero = '';
          }



        }
      },
      error => {
        console.log(error);
      }
    );

    this.updatecompra++;

  }

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
      this.nuevoProducto.idProducto = undefined;

      console.log('this.nuevoProducto', this.nuevoProducto);

    } else {
      console.log('El checkbox está desmarcado.', this.nuevoProducto.useCorrelativo);
      // Realiza acciones cuando el checkbox NO está marcado
      this.nuevoProducto.codigo = '';
    }

  }

  agregarProductoNuevo() {

    if (!this.editardetalle) {
      //quiero agregar la condicion di idProducto, idpresentacion, idcategoria y idsucursal no estan vacios

      if (!this.nuevoProducto.fProduccion) {
        this.nuevoProducto.fProduccion = undefined;
      }

      if (!this.nuevoProducto.fVencimiento) {
        this.nuevoProducto.fVencimiento = undefined;
      }

      if (this.nuevoProducto.idPresentacion != undefined && this.nuevoProducto.idCategoria != undefined && this.nuevoProducto.idSucursal != undefined) {
        this.detalleCompras.push(this.nuevoProducto);
        console.log('si hay datos que guardar')

        try {
          if (this.detalleCompras.idProducto != undefined) {
            this.detalleCompras.forEach((element: any) => {
              console.log('this.detalleCompras.idProducto != undefined');
              //buscar en this.productos el codigo y traer todo el objeto del codigo
              const selectedObject = this.productos.find((item: any) => item.idProducto == element.idProducto);
              element.producto = selectedObject;
              // Ahora, selectedObject contiene toda la información del elemento seleccionado
              //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
              const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == element.idSucursal);
              element.sucursal = selectedObjectSucursal;

              //buscar en this.categoria el idCategoria y traer todo el objeto del idCategoria
              const selectedObjectCategoria = this.categoria.find((item: any) => item.idCategoria == element.idSucursal);
              element.categoria = selectedObjectCategoria;

              //buscar en this.presentacion el idPresentacion y traer todo el objeto del idPresentacion
              const selectedObjectPresentacion = this.presentacion.find((item: any) => item.idPresentacion == element.idSucursal);
              element.presentacion = selectedObjectPresentacion;



            });
          } else {

            console.log('this.detalleCompras.idProducto != undefined');
            this.detalleCompras.forEach((element: any) => {

              //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
              const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == this.nuevoProducto.idSucursal);
              element.sucursal = selectedObjectSucursal;

              //buscar en this.categoria el idCategoria y traer todo el objeto del idCategoria
              const selectedObjectCategoria = this.categoria.find((item: any) => item.idCategoria == this.nuevoProducto.idCategoria);
              element.categoria = selectedObjectCategoria;

              //buscar en this.presentacion el idPresentacion y traer todo el objeto del idPresentacion
              const selectedObjectPresentacion = this.presentacion.find((item: any) => item.idPresentacion == this.nuevoProducto.idPresentacion);
              element.presentacion = selectedObjectPresentacion;



            });
          }
        } catch (error) {
          console.log(error);
        }


      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe llenar todos los campos obligatorios (*).'
        });
      }
    }
    else {
      //aqui quiero editar el detalle de compras utilizando el indice de la fila seleccionada
      console.log('Aquí quiero editar el detalle de compras utilizando el índice de la fila seleccionada');
      console.log('this.nuevoProducto', this.nuevoProducto);
      console.log('this.detalleCompras', this.detalleCompras);

      // Buscar el elemento correspondiente en detalleCompras
      const index = this.detalleCompras.findIndex((element: any) => element.idProducto === this.nuevoProducto.idProducto);

      if (index !== -1) { // Si se encuentra el elemento en detalleCompras
        const element = this.detalleCompras[index];
        // Actualizar los campos del elemento con los datos del nuevo producto
        element.idProducto = this.nuevoProducto.idProducto;
        element.codigo = this.nuevoProducto.codigo;
        element.descripcion = this.nuevoProducto.descripcion;
        element.cUnitario = this.nuevoProducto.cUnitario;
        element.cantidad = this.nuevoProducto.cantidad;
        element.subtotal = this.nuevoProducto.cUnitario * this.nuevoProducto.cantidad;
        element.idCategoria = this.nuevoProducto.idCategoria;
        element.idPresentacion = this.nuevoProducto.idPresentacion;
        element.idSucursal = this.nuevoProducto.idSucursal;
        element.ubicacion = this.nuevoProducto.ubicacion;
        element.fProduccion = this.nuevoProducto.fProduccion;
        element.fVencimiento = this.nuevoProducto.fVencimiento;


        //buscar en this.sucursales el idSucursal y traer todo el objeto del idSucursal
        const selectedObjectSucursal = this.sucursales.find((item: any) => item.idSucursal == element.idSucursal);
        element.sucursal = selectedObjectSucursal;

        //buscar en this.categoria el idCategoria y traer todo el objeto del idCategoria
        const selectedObjectCategoria = this.categoria.find((item: any) => item.idCategoria == element.idCategoria);
        element.categoria = selectedObjectCategoria;

        //buscar en this.presentacion el idPresentacion y traer todo el objeto del idPresentacion
        const selectedObjectPresentacion = this.presentacion.find((item: any) => item.idPresentacion == element.idPresentacion);
        element.presentacion = selectedObjectPresentacion;
      }

      this.editardetalle = false;



      // console.log('aqui quiero editar el detalle de compras utilizando el indice de la fila seleccionada');
      // console.log('this.nuevoProducto', this.nuevoProducto);
      // console.log('this.detalleCompras', this.detalleCompras);
      // this.detalleCompras.forEach((element: any) => {



      //   // if (element.idProducto == this.nuevoProducto.idProducto) {
      //   //   element.idProducto = this.nuevoProducto.idProducto;
      //   //   element.codigo = this.nuevoProducto.codigo;
      //   //   element.descripcion = this.nuevoProducto.descripcion;
      //   //   element.cUnitario = this.nuevoProducto.cUnitario;
      //   //   element.cantidad = this.nuevoProducto.cantidad;
      //   //   element.subtotal = this.nuevoProducto.cUnitario * this.nuevoProducto.cantidad;
      //   //   element.idCategoria = this.nuevoProducto.idCategoria;
      //   //   element.idPresentacion = this.nuevoProducto.Presentacion.idPresentacion;
      //   //   element.idSucursal = this.nuevoProducto.sucursal.idSucursal;
      //   //   element.ubicacion = this.nuevoProducto.ubicacion;
      //   //   element.fProduccion = this.nuevoProducto.fProduccion;
      //   //   element.fVencimiento = this.nuevoProducto.fVencimiento;
      //   // }
      // });
      // this.editardetalle = false;


    }



    console.log('this.detalleCompras', this.detalleCompras);


    //deseo multiplicar el precio por la cantidad de this.nuevoProducto
    this.nuevoProducto.subtotal = this.nuevoProducto.cUnitario * this.nuevoProducto.cantidad;
    console.log('this.nuevoProducto', this.nuevoProducto);


    console.log('this.detalleCompras', this.detalleCompras);

    //deseo recorrer detalleCompras y sumar el subtotal y guardarlo en this.compras.total
    this.compras.subTotal = 0;
    this.detalleCompras.forEach((element: any) => {
      this.compras.subTotal = this.compras.subTotal + element.subtotal;
    });


    this.nuevoProducto = {};
    this.correlativo.numero = this.correlativo.numero + 1;
    this.sumarFooterFactura();

    this.updateDetalleCompra++;

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
    this.updatecompra++;
  }

  onInput() {
    this.compras.total = (this.compras.subTotal + this.compras.igv + this.compras.otrosCargos) - this.compras.descuentos;

  }

  buscarFactura() {
    this.compras.compCompra = this.compras.serie + '-' + this.compras.numero;
    this.compras.idCliente = this.clientes.idCliente;


  }

  // sonIguales(objeto1: any, objeto2: any): boolean {
  //   // Si ambos son arrays
  //   if (Array.isArray(objeto1) && Array.isArray(objeto2)) {
  //     // Verificar si ambos arrays tienen la misma longitud
  //     if (objeto1.length !== objeto2.length) {
  //       return false;
  //     }
  //     // Verificar si todos los elementos de objeto1 son iguales a los elementos correspondientes de objeto2
  //     return objeto1.every((element, index) => element === objeto2[index]);
  //   }

  //   // Si ambos son objetos
  //   if (typeof objeto1 === 'object' && objeto1 !== null && typeof objeto2 === 'object' && objeto2 !== null) {
  //     const keys1 = Object.keys(objeto1);
  //     const keys2 = Object.keys(objeto2);

  //     // Verificar si ambos objetos tienen las mismas claves
  //     if (!this.sonArraysIguales(keys1, keys2)) {
  //       return false;
  //     }

  //     // Verificar si todos los valores de las claves de objeto1 son iguales a los valores correspondientes de objeto2
  //     return keys1.every(key => objeto1[key] === objeto2[key]);
  //   }



  //   // Si no son ni arrays ni objetos, simplemente comparar los valores
  //   return objeto1 === objeto2;
  // }

  sonArraysIguales(array1: any[], array2: any[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }
    return array1.every((element, index) => element === array2[index]);
  }



  ActualizarCompras() {

    this.compras.compCompra = this.compras.serie + '-' + this.compras.numero;
    this.loadActualizarCompras = true;

    console.log('this.compras', this.compras);
    //quiero cambiar el valor de this.compras.idCliente por el valor de this.clientes.idCliente
    this.compras.idCliente = this.compras.idCliente[0];
    this.compras.idEmpresa = this.compras.idEmpresa[0];
    console.log('this.compras antes de enviar al servicio', this.compras.idCompra);

    // Aquí preparo los datos que irán a crear una compra nueva
    this._comprasService.editar_compra(this.compras.idcompra, this.compras, this.token).subscribe(
      response => {
        if (response.data != undefined) {


          // Una vez registrada la compra, preparo para registrar los productos y el detalle de compras
          this.detalleCompras.forEach((element: any) => {
            // Creo una nueva instancia de nuevoProducto y nuevoDetalleCompra en cada iteración
            const nuevoProducto = {
              idProducto: element.idProducto,
              Codigo: element.codigo,
              idCategoria: element.idCategoria,
              descripcion: element.descripcion,
              idPresentacion: element.idPresentacion,
              cUnitario: element.cUnitario,
              fProduccion: element.fProduccion,
              fVencimiento: element.fVencimiento,
              cantidad: element.cantidad,
              cantidadAnterior: element.cantidadAnterior,
              facturar: 'SI',
              idStockSucursal: element.idStockSucursal,
              idEmpresa: element.idEmpresa,
              idSucursal: element.idSucursal,
              ubicacion: element.ubicacion,
            };

            const nuevoDetalleCompra = {
              idEmpresa: element.idEmpresa,
              idSucursal: element.idSucursal,
              idCompra: element.idCompra,
              cantidad: element.cantidad,
              idPresentacion: element.idPresentacion,
              pUnitario: element.cUnitario,
              total: element.subtotal,
              idProducto: element.idProducto, // Aún no conocemos el idProducto, se actualizará después de crearlo o encontrarlo
            };

            console.log('idProducto: element.idProducto', nuevoDetalleCompra.idProducto);

            ////////////////////////////////////////////

            // Identifico si el producto no existe, entonces lo creo, y si existe, solo actualizo el stock
            if (element.idProducto == undefined) {
              console.log('El producto es nuevo');
              this._productoService.crear_producto(nuevoProducto, this.token).subscribe(
                productoResponse => {
                  if (productoResponse.data != undefined) {
                    iziToast.show({
                      title: 'SUCCESS',
                      titleColor: '#1DC74C',
                      color: '#FFF',
                      class: 'text-success',
                      position: 'topRight',
                      message: 'El producto se registró correctamente.',
                    });

                    // Actualizo el idProducto en nuevoDetalleCompra
                    nuevoDetalleCompra.idProducto = productoResponse.data;
                    nuevoProducto.idProducto = productoResponse.data;
                    // Registro el stock del nuevo producto
                    this._sucursalService.crear_stock_sucursal_idEmpresa(nuevoProducto, this.token).subscribe(
                      stockResponse => {
                        if (stockResponse.data != undefined) {
                          iziToast.show({
                            title: 'SUCCESS',
                            titleColor: '#1DC74C',
                            color: '#FFF',
                            class: 'text-success',
                            position: 'topRight',
                            message: 'El stock se registró correctamente.',
                          });
                        }
                      },
                      stockError => {
                        console.log(stockError);
                      }
                    );

                    // Registro el detalle de compra
                    this._comprasService.crear_detalle_compras_idcompra(nuevoDetalleCompra, this.token).subscribe(
                      detalleResponse => {
                        if (detalleResponse.data != undefined) {
                          iziToast.show({
                            title: 'SUCCESS',
                            titleColor: '#1DC74C',
                            color: '#FFF',
                            class: 'text-success',
                            position: 'topRight',
                            message: 'El detalle de compra se registró correctamente.',
                          });
                        }
                      },
                      detalleError => {
                        console.log(detalleError);
                      }
                    );
                  }
                },
                productoError => {
                  console.log(productoError);
                }
              );
            } else {
              // El código ya existe, entonces actualizo el producto y stock
              this._productoService.actualizar_producto(element.idProducto, nuevoProducto, this.token).subscribe(
                response => {
                  if (response.data != undefined) {
                    iziToast.show({
                      title: 'SUCCESS',
                      titleColor: '#1DC74C',
                      color: '#FFF',
                      class: 'text-success',
                      position: 'topRight',
                      message: 'El producto se actualizó correctamente.',
                    });
                  }
                },
                error => {
                  console.log(error);
                }
              );

              this._sucursalService.editar_stock_sucursal(element.idProducto, nuevoProducto, this.token).subscribe(
                response => {
                  if (response.data != undefined) {
                    iziToast.show({
                      title: 'SUCCESS',
                      titleColor: '#1DC74C',
                      color: '#FFF',
                      class: 'text-success',
                      position: 'topRight',
                      message: 'El stock se actualizó correctamente.',
                    });
                  }
                },
                error => {
                  console.log(error);
                }
              );
            }
          });

          // Después de agregar todos los productos, actualizo el correlativo
          this._comprasService.editar_correlativos_empresa(this.correlativo.idCorrelativo, this.correlativo, this.token).subscribe(
            correlativoResponse => {
              if (correlativoResponse.data != undefined) {
                iziToast.show({
                  title: 'SUCCESS',
                  titleColor: '#1DC74C',
                  color: '#FFF',
                  class: 'text-success',
                  position: 'topRight',
                  message: 'El correlativo se actualizó correctamente.',
                });
              }
            },
            correlativoError => {
              console.log(correlativoError);
            }
          );

          this.loadActualizarCompras = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }




}
