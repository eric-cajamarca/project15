import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-create-compras',
  templateUrl: './create-compras.component.html',
  styleUrls: ['./create-compras.component.css']
})
export class CreateComprasComponent implements OnInit{

  public compras: any = {};
  public detalleCompras: any = {};
  public comprobantes: any = [];
  public clientes: any = {};
  public productos: any = {};
  public sucursales: any = {};
  public stockSucursales: any = {};
  public filtro: any = {};
  public documento: any = {};


  public token: any;


  constructor(
    private _cookieService: CookieService,
    private _comprasService: ComprasService,
    private _comprobanteService: ComprobanteService,
    private _clientesService: ClienteService,
    private _productoService: ProductoService,
    private _sucursalService: SucursalService,
    private _documentoService: DocumentoService
    
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    this.initData();

  }

  initData(){
    
    this._comprobanteService.obtener_comprobantes(this.token).subscribe(
      response => {
        this.comprobantes = response.data;
        console.log(this.comprobantes);
      },
      error => {
        console.log(error);
      }
    );
    
    // this._documentoService.obtener_documento(this.token).subscribe(
    //   response => {
    //     this.documento = response.data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

    // this._clientesService.obtener_cliente_ruc(this.filtro,this.token).subscribe(
    //   response => {
    //     this.clientes = response.data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // this._productoService.obtener_productos_todos(this.token).subscribe(
    //   response => {
    //     this.productos = response.data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // this._sucursalService.obtener_sucursal_idempresa(this.token).subscribe(
    //   response => {
    //     this.sucursales = response.data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

  }

  buscar(){
    console.log('this.filtro',this.filtro);
    console.log('this.clientes.ruc',this.clientes.ruc);

    this._clientesService.obtener_cliente_ruc(this.clientes.ruc,this.token).subscribe(
      response => {
        this.clientes = response.data[0];
        console.log(this.clientes);
      },
      error => {
        console.log(error);
      }
    );
  }
  
}
