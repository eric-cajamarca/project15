import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DespachoSerciceService } from 'src/app/services/despacho.sercice.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index-despachos',
  templateUrl: './index-despachos.component.html',
  styleUrls: ['./index-despachos.component.css']
})
export class IndexDespachosComponent implements OnInit {

  public id: any = '';
  public compVenta: any = {};
  public compEnvio: any = '';
  public detalleVenta: any = [];
  public henvio: any = [];
  public empresa:any= [];
  public empresaSeleccionada: any;
  public idempresa: any = {};
  public aliasEmpresa: any = '';
  public token = localStorage.getItem('token');
  public filtro = '';
  public page = 1;
  public pageSize = 10;

  constructor(
    private _despachoService: DespachoSerciceService,
    private _empresaService: EmpresaService
  ) {

  }

  ngOnInit(): void {
    this.filtro = 'NP01-00000215'

    this._empresaService.getEmpresas(this.token).subscribe(
      response => {
        this.empresa = response.data;
        console.log('this.empresa : ', this.empresa);
      }
    )

  }

  filtrar() {

    // let data:any = {
    //   Serie_Numero: this.filtro,
    //   aliasempresa: this.aliasEmpresa,
    //   idempresa: this.idempresa
    // }

      
    this._despachoService.obtener_datos_cventas_empresa(this.filtro, this.aliasEmpresa, this.token).subscribe(
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

    this._despachoService.obtener_datos_dventas_empresa(this.filtro, this.idempresa, this.token).subscribe(
      response => {

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
    );

    this._despachoService.obtener_datos_renvios(this.filtro, this.token).subscribe(
      response => {
        this.henvio = response;
        console.log('henvio:', this.henvio);

        if (response != undefined) {
          // Conjunto para realizar un seguimiento de CompEnvio únicos
          const compEnvioSet: Set<string> = new Set();

          // Filtrar registros únicos y almacenarlos en compEnvio
          this.compEnvio = response.filter((item: any) => {
            const compEnvio = item.CompEnvio;

            if (!compEnvioSet.has(compEnvio)) {
              compEnvioSet.add(compEnvio);
              return true; // Añadir al resultado final
            }

            return false; // Duplicado, no añadir al resultado final
          });

          console.log('Registros únicos de CompEnvio:', this.compEnvio);
        }


      }
    )

  }


  onEmpresaSeleccionada() {
    if (this.empresaSeleccionada) {
      this.idempresa = this.empresaSeleccionada.id;
      this.aliasEmpresa = this.empresaSeleccionada.Alias;
  
      console.log('ID seleccionado:', this.idempresa);
      console.log('Alias seleccionado:', this.aliasEmpresa);
    }
  }
  
  ingresar(){
    //envio los parametros
    const datos = { id: this.idempresa, Alias:this.aliasEmpresa, Serie_Numero: this.compVenta.Serie_Numero };
    this._despachoService.setDatos_rDespacho(datos);
  }

}
