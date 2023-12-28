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
  public moneda: any = [];
  public estadoPago: any = [];
  public mediosPago: any = [];
  public categoria: any = [];
  public presentacion: any = [];

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
        console.log('this.categoria',this.categoria);
      },
      error => {
        console.log(error);
      }
    );
    
    this._presentacionService.obtener_presentaciones(this.token).subscribe(
      response => {
        this.presentacion = response.data;
        console.log('this.presentacion',this.presentacion);
      },
      error => {
        console.log(error);
      }
    );

    this._sucursalService.obtener_sucursal_idempresa(this.token).subscribe(
      response => {
        this.sucursales = response.data;
        console.log('this.sucursales',this.sucursales);
      },
      error => {
        console.log(error);
      }
    );

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
  

  quitar(idx:any,subtotal:any){
    this.detalleCompras.splice(idx,1);
    this.compras.total = this.compras.total - subtotal;
  }

  buscarDescripcion(){

  }

  buscarCodigo(){

  }
}
