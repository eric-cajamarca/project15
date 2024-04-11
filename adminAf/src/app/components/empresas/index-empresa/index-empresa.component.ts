import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmpresaService } from 'src/app/services/empresa.service';

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

cambiarEstado(id: any, estado:any) {}

editarempresas(id: any) {}

}
