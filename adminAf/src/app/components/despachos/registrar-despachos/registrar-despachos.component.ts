import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CventaService } from 'src/app/services/cventa.service';
import { DespachoSerciceService } from 'src/app/services/despacho.sercice.service';
import { DventaService } from 'src/app/services/dventa.service';
import { EmpresaService } from 'src/app/services/empresa.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-registrar-despachos',
  templateUrl: './registrar-despachos.component.html',
  styleUrls: ['./registrar-despachos.component.css']
})
export class RegistrarDespachosComponent implements OnInit {

  public datos: any;
  public compVenta: any = {};
  public detalleVenta: any = [];
  public token = localStorage.getItem('token');
  public dCantidad: any;
  public idempresa: any;
  public serieNumero: any;
  public aliasempresa: any;
  public valides: any = false;
  public mensajeCant = '';

  constructor(
    private route: ActivatedRoute,
    private _despachoService: DespachoSerciceService,
    private _empresaService: EmpresaService,
    private _cventas: CventaService,
    private _dventas: DventaService
  ) {

  }

  ngOnInit(): void {

    //aqui jalo los parametros de comprobante y empresa
    this.route.params.subscribe(params => {
      this.idempresa = params['id'];
      this.serieNumero = params['serie'];

      // Haz algo con idempresa y serie
      console.log('idempresa:', this.idempresa);
      console.log('serieNumero:', this.serieNumero);
      console.log(params);
    });

    this._empresaService.getEmpresas_id(this.idempresa, this.token).subscribe(
      response => {
        this.aliasempresa = response[0].Alias;
        console.log('this.alias', this.aliasempresa);


        this._cventas.obtener_datos_cventas_empresa(this.serieNumero, this.aliasempresa, this.token).subscribe(
          response => {
            console.log('obtener_datos_cventas', response);
            if (response != undefined) {
              // Modificar el campo 'password' dentro del responseay 'data'
              response.forEach((item: any) => {
                this.compVenta.Serie_Numero = item.Serie_Numero;
                this.compVenta.IdDoc = item.IdDoc;
                // this.compVenta.SerieDoc = item.SerieDoc;
                // this.compVenta.NumeroDoc = item.NumeroDoc;
                this.compVenta.F_Emision = item.F_Emision;
                // this.compVenta.F_Vencimiento = item.F_Vencimiento;
                // this.compVenta.TipoDoc = item.TipoDoc;
                // this.compVenta.Ruc = item.Ruc_Dni;
                this.compVenta.Razon_Social = item.Razon_Social;
                // this.compVenta.CondicionPago = item.CondicionPago;
                this.compVenta.Total = item.Total;
                // this.compVenta.Estado = item.Estado;
                // this.compVenta.EstadoPedido = item.EstadoPedido;
                // this.compVenta.EstadoSunat = item.EstadoSunat;
                this.compVenta.Usuario = item.Usuario;
                // this.compVenta.destino = item.destino;

              });
            }

            console.log('this.compVenta', this.compVenta);
          });
      }
    )


    this.cargarDatos();

  }

  cargarDatos() {

    console.log('alias en la funcion cargarDatos', this.aliasempresa);


    this._dventas.obtener_datos_dventas_empresa(this.serieNumero, this.idempresa, this.token).subscribe(
      response => {

        this.detalleVenta = response;
        
        //   if (response != undefined) {
        //     response.forEach((item:any) =>{
        //       this.detalleVenta.id = item.id;
        //       this.detalleVenta.compVenta = item.CompVenta;
        //       this.detalleVenta.Cantidad = item.Cantidad;
        //       this.detalleVenta.Codigo = item.Codigo;
        //       this.detalleVenta.Descripcion = item.Descripcion;
        //       this.detalleVenta.Presentacion = item.Presentacion;
        //       this.detalleVenta.Precio = item.PVenta;
        //       this.detalleVenta.CEntregado = item.CantEntregado;

        //     });

        //   // } else {

        //    }

        //   console.log('obtener datos detalle ventas', this.detalleVenta);
      }
    );
  }

  guardarDatos(miFormulario: any) {
    // console.log('miformulario', miFormulario);
    console.log('guardo los datos del formulario', this.detalleVenta);
    // Validar cantidades antes de enviar al backend

    // Suponiendo que detalleVenta es un array de objetos con las propiedades CantidadIngresar y Cantidad
    for (const item of this.detalleVenta) {
      // console.log('item.cantingresar', item.CantidadIngresar);
      console.log('item.cantEntregado', item.CantEntregado);

      if (item.CantEntregado > item.Cantidad) {
        console.log('Error:', item.CantEntregado, 'para el registro con Id', item.Descripcion);
        // Puedes manejar el error aquí según tus necesidades
        this.valides = true;
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Error en la Cantidad ingresada para el registro:' + item.Descripcion,

        });


      }
    }

    //const isValid = this.detalleVenta.every((item: { CantidadIngresar: number; Cantidad: number; }) => item.CantidadIngresar <= item.Cantidad);

    if (!this.valides) {
      console.log('El formulario si es valido');
      this._dventas.actualizar_CEntrega_DVentas(this.serieNumero, this.detalleVenta, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message,
            });

          } else {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: response.message,
            });
            // console.log('actualizar_CEntrega_DVentas response', response);
          }


        },
        error => {

        }

      )

    }
    // else {
    //   iziToast.show({
    //     title: 'ERROR',
    //     titleColor: '#FF0000',
    //     color: '#FFF',
    //     class: 'text-danger',
    //     position: 'topRight',
    //     message: 'Las cantidades ingresadas no son válidas'
    //   });
    //   console.error('Las cantidades ingresadas no son válidas');
    // }


  }

  resetCantEntrega(){
    this.detalleVenta.forEach((item: any) => {
      item.CantEntregado = 0;
    });
    
  }

}
