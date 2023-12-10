import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProgramacionService } from 'src/app/services/programacion.service';

@Component({
  selector: 'app-index-envios',
  templateUrl: './index-envios.component.html',
  styleUrls: ['./index-envios.component.css']
})
export class IndexEnviosComponent implements OnInit{

  public token: any = "";
  public enviosProgramados: any = [];

  constructor(
    private _cookieService: CookieService,
    private _programacionService: ProgramacionService,
  ) { 
    this.token = this._cookieService.get('token');

  }

  ngOnInit(): void {
    
    this._programacionService.obtener_all_programaciones(this.token).subscribe(
      response=>{
        this.enviosProgramados = response.data;
        console.log('this.enviosProgramados',this.enviosProgramados);

        //quiero buscar los datos unicos en el campo FEnvio y contar cuantos registros hay de con ese dato unico
         let unique = [...new Set(this.enviosProgramados.map((item: { FEnvio: any; }) => item.FEnvio))];
          console.log('unique',unique);
          
          //ahora quiero que cada unique sea un objeto con el campo FEnvio y la cantidad de registros que hay con ese campo
          this.enviosProgramados = unique.map((item: any) => {
            return {
              FEnvio: item,
              cantidad: this.enviosProgramados.filter((item2: { FEnvio: any; }) => item2.FEnvio === item).length
            }
          })
          console.log('unique2',this.enviosProgramados);

          //ahora quiero convertir en un objeto a this.enviosProgramados
          this.enviosProgramados = this.enviosProgramados.map((item: any) => {
            return {
              FEnvio: item.FEnvio,
              cantidad: item.cantidad,
              data: this.enviosProgramados.filter((item2: { FEnvio: any; }) => item2.FEnvio === item.FEnvio)

              
            }
          })
          console.log('unique2',this.enviosProgramados);

          


      },
      error=>{
        console.log(<any>error);
      }
    )

  }

  

}
