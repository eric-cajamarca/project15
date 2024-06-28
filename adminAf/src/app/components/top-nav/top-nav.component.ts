import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { EmpresaService } from 'src/app/services/empresa.service';



@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  public usuario: any = {};
  public user: any = "";
  public empConect: any = {};
  public token: any = "";
  public UserConect: any = {
    nombres: ""
  };

  constructor(
    private _router: Router,
    private _adminService: AdminService,
    private _cookieService: CookieService,
    private _empresaService: EmpresaService
  ) {

    this.token = this._cookieService.get('token');
    this.usuario = this._adminService.idUser;
    //this.idempresa = this._adminService.idempresa;
    this.UserConect.nombres = this.usuario.apellidos +', '+ this.usuario.nombres ; 

    console.log(this.UserConect);

    let str_user = this._cookieService.get('token');
    this.user = this._cookieService.get('user_data');
    
    // if (this.user && this.user.rol) {
    //   console.log('this.user', this.user.rol);
    // } else {
    //   console.log('this.user or this.user.rol is undefined');
    // }

    //quiero extraer el rol de this.user
    this.user = JSON.parse(this.user);
    console.log('this.user', this.user.rol);

    //console.log('this.idempresa', this.idempresa);

    


   
  }

  ngOnInit(){
    this._empresaService.getEmpresas_id(this.usuario.empresa, this.token).subscribe(
      response => {
        console.log('response', response);
        this.empConect.nombre = response.data[0].razon_Social;
        console.log('this.empConect', this.empConect);
      },
      error => {
        console.log('error', error);
      }
    );
  }

  logout() {
    window.location.reload();
    this._cookieService.delete('token');

    //localStorage.clear();


  }

}
