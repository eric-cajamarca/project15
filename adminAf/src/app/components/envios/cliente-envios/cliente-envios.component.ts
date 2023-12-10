import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(
    private _cookieService: CookieService,
    private _programacionService: ProgramacionService,
    private _route: ActivatedRoute,
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
  }

}
