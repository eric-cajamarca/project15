import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  public usuario: any = {};
  public user: any = "";

  constructor(
    private _router: Router,
    private _adminService: AdminService,
    private _cookieService: CookieService,
  ) {

    this.usuario = this._adminService.idUser;
    console.log(this.usuario);

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

   
  }

  logout() {
    window.location.reload();
    this._cookieService.delete('token');

    //localStorage.clear();


  }

}
