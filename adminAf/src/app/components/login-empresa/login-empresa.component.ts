import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';

declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent {

  public user:any = {};
  public usuario:any = {};
  public token:any = "";

  constructor(
    private _adminService:AdminService,
    private _router:Router,
    private cookieService: CookieService,
    private _cookieService: CookieService,
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    // console.log(this.token);
    // // $('body').css('background-color', 'red');
    // if(this.token){
    //   this._router.navigate(['/']);
    // }else{
      
      
    // }
    
  }

  login(loginform:any){
    if(loginform.valid){
      
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password,
        ruc: this.user.ruc
      }
      
      this._adminService.admin_login(data).subscribe(
        response=>{
          console.log('response', response);
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
            this.usuario = response.data.idEmpresa;
             console.log(this.usuario);

            //quiero guardar el token en CookieService
            this.cookieService.set('token', response.token);
            this.cookieService.set('identity', response.data.idUsuario);
            this.cookieService.set('user_data',JSON.stringify(response.data));

            //quiero guardar el token en localStorage
            // localStorage.setItem('token', response.token);
            // localStorage.setItem('identity', response.data.id);
            // localStorage.setItem('user_data',JSON.stringify(response.data));

            //si el ruc y la contraseña son correctos entonces redirecciono a la empresa/:id solo por una unica vez
            this._router.navigate(['/empresa/'+response.data.idUsuario]);



            
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
