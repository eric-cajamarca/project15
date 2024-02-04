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

declare var iziToast: any;
declare var $: any;
const FORMATO_FECHA = 'dd/MM/yyyy';

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

  public idCompra: any = '';
  public detalleCompras: any = [];
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
  public documento: any = {};
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
          console.log(this.clientes);
        }else{
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
    this.detalleCompras.splice(idx, 1);
    this.compras.total = this.compras.total - subtotal;
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

  buscarFactura() {
    this.compras.compCompra = this.compras.serie + '-' + this.compras.numero;
    this.compras.idCliente = this.clientes.idCliente;


  }


  registrarCompras() {

    this.compras.compCompra = this.compras.serie + '-' + this.compras.numero;

    console.log('this.compras', this.compras);
    //aqui preparo los datos que iran a crear una compra nueva
    this._comprasService.crear_compra(this.compras, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          //aqui agrego el idcompra de la compra recien creada a cada detalle de compra
          this.idCompra = response.data;
          console.log('this.idCompra', this.idCompra);


          //una vez registrada la compra prepato para registrar los productos y el detalle de compras

          this.nuevoProducto = {};
          this.nuevoDetalleCompra = {};
          //aqui preparo los datos que iran a crear un producto nuevo
          this.detalleCompras.forEach((element: any) => {
            this.nuevoProducto.idProducto = element.idProducto;
            this.nuevoProducto.Codigo = element.codigo;
            this.nuevoProducto.idCategoria = element.idCategoria;
            this.nuevoProducto.descripcion = element.descripcion;
            this.nuevoProducto.idPresentacion = element.idPresentacion;
            this.nuevoProducto.cUnitario = element.cUnitario;
            this.nuevoProducto.fProduccion = element.fProduccion;
            this.nuevoProducto.fVencimiento = element.fVencimiento;
            this.nuevoProducto.cantidad = element.cantidad;
            this.nuevoProducto.cantidadAnterior = element.cantidadAnterior;
            this.nuevoProducto.facturar = 'SI';
            this.nuevoProducto.idStockSucursal = element.idStockSucursal;
            this.nuevoProducto.idEmpresa = element.idEmpresa;
            this.nuevoProducto.idSucursal = element.idSucursal;
            this.nuevoProducto.ubicacion = element.ubicacion;


            // .input('idEmpresa', sql.UniqueIdentifier, idEmpresa)
            //           .input('idSucursal', sql.UniqueIdentifier, idSucursal)
            //           .input('idCompra', sql.UniqueIdentifier, idCompra)
            //           .input('cantidad', sql.Decimal, cantidad)
            //           .input('idProducto', sql.UniqueIdentifier, idProducto)
            //           .input('idPresentacion', sql.Int, idPresentacion)
            //           .input('pUnitario', sql.Decimal, pUnitario)
            //           .input('total', sql.Decimal, total)
            //           .input('idUsuario', sql.UniqueIdentifier, idUsuario)}

            this.nuevoDetalleCompra.idSucursal = element.idSucursal;
            this.nuevoDetalleCompra.idCompra = this.idCompra;
            this.nuevoDetalleCompra.cantidad = element.cantidad;

            this.nuevoDetalleCompra.idPresentacion = element.idPresentacion;
            this.nuevoDetalleCompra.pUnitario = element.cUnitario;
            this.nuevoDetalleCompra.total = element.subtotal;

            console.log('this.nuevoProducto', this.nuevoProducto);

            //aqui identifico si el producto no existe, entonces lo creo y si existe, solo actualizo el stock
            if (element.idProducto == undefined) {
              console.log('el producto es nuevo');
              //como el codigo es nuevo, entonces creo un producto nuevo
              this._productoService.crear_producto(this.nuevoProducto, this.token).subscribe(
                response => {
                  if (response.data != undefined) {
                    iziToast.show({
                      title: 'SUCCESS',
                      titleColor: '#1DC74C',
                      color: '#FFF',
                      class: 'text-success',
                      position: 'topRight',
                      message: 'El producto se registró correctamente.'
                    });
                  }
                  // this.nuevoProducto = {};
                  this.nuevoProducto.idProducto = response.data;
                  console.log('this.nuevoProducto', this.nuevoProducto);

                  //aqui preparo los datos que iran a crear un stock nuevo      
                  console.log('aqui preparo los datos que iran this.nuevodetalleCompras', this.detalleCompras);
                  this._sucursalService.crear_stock_sucursal_idEmpresa(this.nuevoProducto, this.token).subscribe(
                    response => {
                      if (response.data != undefined) {
                        iziToast.show({
                          title: 'SUCCESS',
                          titleColor: '#1DC74C',
                          color: '#FFF',
                          class: 'text-success',
                          position: 'topRight',
                          message: 'El stock se registró correctamente.'
                        });
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );



                  console.log(' this.nuevoDetalleCompra listo para el backend', this.nuevoDetalleCompra);
                  console.log('idcompra antes de detalle compra', this.idCompra);

                  this.nuevoDetalleCompra.idProducto = this.nuevoProducto.idProducto;

                  this._comprasService.crear_detalle_compras_idcompra(this.nuevoDetalleCompra, this.token).subscribe(
                    response => {
                      if (response.data != undefined) {
                        iziToast.show({
                          title: 'SUCCESS',
                          titleColor: '#1DC74C',
                          color: '#FFF',
                          class: 'text-success',
                          position: 'topRight',
                          message: 'El detalle de compra se registró correctamente.'
                        });
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );


                },
                error => {
                  console.log(error);
                }
              );



            } else {
              //como el codigo ya existe, entonces actualizo el producto y stock
              this._productoService.actualizar_producto(this.nuevoProducto.idProducto, this.nuevoProducto, this.token).subscribe(
                response => {
                  if (response.data != undefined) {
                    iziToast.show({
                      title: 'SUCCESS',
                      titleColor: '#1DC74C',
                      color: '#FFF',
                      class: 'text-success',
                      position: 'topRight',
                      message: 'El producto se actualizó correctamente.'
                    });
                  }
                  console.log('response.data producto actualizado', response.data);
                },
                error => {
                  console.log(error);
                }
              );

              this._sucursalService.editar_stock_sucursal(this.nuevoProducto.idProducto, this.nuevoProducto, this.token).subscribe(
                response => {
                  if (response.data != undefined) {
                    iziToast.show({
                      title: 'SUCCESS',
                      titleColor: '#1DC74C',
                      color: '#FFF',
                      class: 'text-success',
                      position: 'topRight',
                      message: 'El stock se actualizó correctamente.'
                    });
                  }
                },
                error => {
                  console.log(error);
                }
              );
            }

          });




        }

      }
      , error => {
        console.log(error);
      }
    );

    console.log('this.correlativo.numero', this.correlativo);

    //despues de agregar todos los productos, quiero actualizar el correlativo
    this._comprasService.editar_correlativos_empresa(this.correlativo.idCorrelativo, this.correlativo, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'El correlativo se actualizó correctamente.'
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
