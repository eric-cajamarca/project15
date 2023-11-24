import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DespachoSerciceService } from 'src/app/services/despacho.sercice.service';

@Component({
  selector: 'app-index-despachos',
  templateUrl: './index-despachos.component.html',
  styleUrls: ['./index-despachos.component.css']
})
export class IndexDespachosComponent implements OnInit {

  public id: any = '';
  public compVenta: any = {};
  public detalleVenta:any = [];
  public token = localStorage.getItem('token');
  public filtro = '';
  public page = 1;
  public pageSize = 10;

  constructor(
    private _despachoService: DespachoSerciceService
  ) {

  }

  ngOnInit(): void {
    this.id = 'B001-00000002'

    this._despachoService.obtener_datos_cventas(this.id, this.token).subscribe(
      response => {
        console.log('obtener_datos_cventas', response);
        if (response != undefined) {
          // Modificar el campo 'password' dentro del array 'data'
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

      this._despachoService.obtener_datos_dventas(this.id, this.token).subscribe(
        response=>{

          this.detalleVenta = response;
          // if (response != undefined) {
          //   response.forEach((item:any) =>{
          //     this.detalleVenta.id = item.id;
          //     this.detalleVenta.compVenta = item.CompVenta;
          //     this.detalleVenta.Cantidad = item.Cantidad;
          //     this.detalleVenta.Codigo = item.Codigo;
          //     this.detalleVenta.Descripcion = item.Descripcion;
          //     this.detalleVenta.Presentacion = item.Presentacion;
          //     this.detalleVenta.Precio = item.PVenta;
          //     this.detalleVenta.CEntregado = item.CantEntregado;

          //   });
            
          // } else {
            
          // }

          console.log('obtener datos detalle ventas', this.detalleVenta);
        }
      )
  }

  filtrar(){

  }
}
