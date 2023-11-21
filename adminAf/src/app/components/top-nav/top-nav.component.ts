import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

 public usuario:any = {};
  
  constructor(
    private _router:Router,
    private _adminService:AdminService
  ){
    // let str_user :any = localStorage.getItem('user_data');
    // this.usuario = JSON.parse(str_user);
    // console.log(this.usuario);

    this.usuario = this._adminService.idUser;
     console.log(this.usuario);


     let str_user = this._adminService.gettoken();
  }

  logout(){
    window.location.reload();
    localStorage.clear();
   
  }
  
}
