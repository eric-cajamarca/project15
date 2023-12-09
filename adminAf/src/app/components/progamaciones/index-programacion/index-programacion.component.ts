import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProgramacionService } from 'src/app/services/programacion.service';

@Component({
  selector: 'app-index-programacion',
  templateUrl: './index-programacion.component.html',
  styleUrls: ['./index-programacion.component.css']
})
export class IndexProgramacionComponent implements OnInit {

  public token:any = '';
  public programado:any = [];

  constructor(
    private _cookieService: CookieService,
    private _progamacionService: ProgramacionService,
  ) {
    this.token = this._cookieService.get('token');
   }


  ngOnInit() {
    this._progamacionService.obtener_all_programaciones(this.token).subscribe(
      response=>{
        
        this.programado = response.programacion;
        console.log('this.programado',this.programado);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
