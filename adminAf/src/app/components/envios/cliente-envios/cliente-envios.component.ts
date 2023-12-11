import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DventaService } from 'src/app/services/dventa.service';
import { ProgramacionService } from 'src/app/services/programacion.service';

@Component({
  selector: 'app-cliente-envios',
  templateUrl: './cliente-envios.component.html',
  styleUrls: ['./cliente-envios.component.css']
})
export class ClienteEnviosComponent {
  public token: any = "";
  public enviosProgramados: any = [];
  public idUrlFecha = '';
  public filtro = '';

  constructor(
    private _cookieService: CookieService,
    private _programacionService: ProgramacionService,
    private _route: ActivatedRoute,
    private _dventasService: DventaService,
  ) { 
    this.token = this._cookieService.get('token');

  }

  ngOnInit(): void {

    //quiero optener el parametro de la url
     this._route.params.subscribe((params: { [x: string]: any; })=>{
      this.idUrlFecha = params['id'];
      console.log('this.id',this.idUrlFecha);
      })  
    
    // this._programacionService.obtener_all_programaciones(this.token).subscribe(
    //   response=>{
    //     this.enviosProgramados = response.data;
    //     console.log('this.enviosProgramados',this.enviosProgramados);

        
    //     this.enviosProgramados = this.enviosProgramados.map((item: any) => {
    //       return {
    //         FEnvio: item.FEnvio,
    //         cantidad: item.cantidad,
    //         data: this.enviosProgramados.filter((item2: { FEnvio: any; }) => item2.FEnvio === item.FEnvio)
    //       }
    //     })

    //     console.log('this.enviosProgramados objeto',this.enviosProgramados);

              


    //   },
    //   error=>{
    //     console.log(<any>error);
    //   }
    // )

    this._programacionService.obtener_programaciones_id(this.idUrlFecha,this.token).subscribe(
      response=>{
        this.enviosProgramados = response.data;
        console.log('this.enviosProgramados',this.enviosProgramados);
      }
    )

     
    // this._dventasService.obtener_datos_dventas_empresa(this.filtro, this.idempresa, this.token).subscribe(
    //   response => {

    //     this.detalleVenta = response;
        // if (response != undefined) {
        //   response.forEach((item:any) =>{
        //     this.detalleVenta.id = item.id;idad;
        //     this.detalleVenta.Codigo = item.Codigo;
        //     this.detalleVenta.compVenta = item.CompVenta;
        //     this.detalleVenta.Cantidad = item.Cant
        //     this.detalleVenta.Descripcion = item.Descripcion;
        //     this.detalleVenta.Presentacion = item.Presentacion;
        //     this.detalleVenta.Precio = item.PVenta;
        //     this.detalleVenta.CEntregado = item.CantEntregado;

        //   });

        // } else {

        // }

    //     console.log('obtener datos detalle ventas', this.detalleVenta);
    //   }
    // );
  }

}
