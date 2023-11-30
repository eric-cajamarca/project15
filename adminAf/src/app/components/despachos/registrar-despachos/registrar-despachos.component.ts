import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DespachoSerciceService } from 'src/app/services/despacho.sercice.service';

@Component({
  selector: 'app-registrar-despachos',
  templateUrl: './registrar-despachos.component.html',
  styleUrls: ['./registrar-despachos.component.css']
})
export class RegistrarDespachosComponent implements OnInit {

  public datos:any;
  public compVenta: any = {};
  public detalleVenta: any = {};
  public token = localStorage.getItem('token');
  public dCantidad: any;

  constructor(
    private route: ActivatedRoute,
    private _despachoService: DespachoSerciceService
  ) {

  }

  ngOnInit(): void {

   this.datos = this._despachoService.getDatos_rDespacho();

   console.log('datos', this.datos);
    // this.route.queryParams.subscribe(params => {
    //   const idempresa = params['idempresa'];
    //   const Serie_Numero = params['Serie_Numero'];

    //   // Haz algo con idempresa y serie
    //   console.log('idempresa:', idempresa);
    //   console.log('Serie_Numero:', Serie_Numero);
    // });

    this._despachoService.obtener_datos_cventas_empresa(this.datos.Serie_Numero, this.datos.Alias, this.token).subscribe(
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

    this._despachoService.obtener_datos_dventas_empresa(this.datos.Serie_Numero, this.datos.id, this.token).subscribe(
      response => {

        //this.detalleVenta = response;
        if (response != undefined) {
          response.forEach((item:any) =>{
            this.detalleVenta.id = item.id;
            this.detalleVenta.compVenta = item.CompVenta;
            this.detalleVenta.Cantidad = item.Cantidad;
            this.detalleVenta.Codigo = item.Codigo;
            this.detalleVenta.Descripcion = item.Descripcion;
            this.detalleVenta.Presentacion = item.Presentacion;
            this.detalleVenta.Precio = item.PVenta;
            this.detalleVenta.CEntregado = '0';

          });

        // } else {

         }

        console.log('obtener datos detalle ventas', this.detalleVenta);
      }
    );

    

  }

  SumCant(){
    this.dCantidad.cantidad = this.dCantidad.cantidad + 1;
  }

  RestCant(){
    if(this.dCantidad.cantidad >= 1){
      this.dCantidad.cantidad = this.dCantidad.cantidad - 1;
    }
  }

}
