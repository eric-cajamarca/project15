import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public user:any = {};
  public usuario:any = {};
  public token:any = "";

  constructor(
    private _adminService:AdminService,
    private _router:Router
  ){
    this.token =  this._adminService.gettoken;
  }

  ngOnInit(): void {
    console.log(this.token);
    // $('body').css('background-color', 'red');
    if(this.token){
      this._router.navigate(['/']);
    }else{
      
      
    }
    
  }

  login(loginform:any){
    if(loginform.valid){
      
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }
      
      this._adminService.admin_login(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
          }else{
            this.usuario = response.data;
            // console.log(this.usuario);

            localStorage.setItem('token', response.token);
            localStorage.setItem('identity', response.data.id);
            localStorage.setItem('user_data',JSON.stringify(response.data));

            this._router.navigate(['/']);
          }
        },
        error=>{
          console.log(error);
          
        }
        
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Llene todos los campos'
    });
    }
  }

}
