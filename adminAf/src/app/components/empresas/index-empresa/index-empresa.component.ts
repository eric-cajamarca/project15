import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmpresaService } from 'src/app/services/empresa.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-index-empresa',
  templateUrl: './index-empresa.component.html',
  styleUrls: ['./index-empresa.component.css']
})
export class IndexEmpresaComponent {
public empresas:Array<any> = [];
public empresas_const: Array<any> = []
public token: any = '';
public prod_Modificar: any = {};
public load_estado: any = false;

constructor(
  public _cookieService: CookieService,
  public _empresaService: EmpresaService,
  public _router: Router,
  
) {
  this.token = this._cookieService.get('token');
 }



ngOnInit() {
  this.initData();
}

initData() { 
  this._empresaService.getEmpresas(this.token).subscribe(
    response => {
      console.log('response', response.data);
      this.empresas = response.data;
      this.empresas_const = response.data;
    },
    error => {
      console.log(error);
    }
  );
}

seleccionar(id:any){}

cambiarEstado(id: any, estado:any) {
  console.log('cambiar estado', id, estado);
  this.load_estado = true;
  this._empresaService.cambiar_estado_empresa(id, estado, this.token).subscribe(
    response => {
      console.log('response', response);
      this.load_estado = false;

      if (response.data != undefined) {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#006064',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Estado cambiado correctamente'
        });

        this.initData();
      }
    },
    error => {
      console.log(error);
    }
  );
}

editarempresas(id: any) {}

}
