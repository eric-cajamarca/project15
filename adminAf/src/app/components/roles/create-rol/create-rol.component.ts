import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from 'src/app/services/rol.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit{

  public rol:any = {};
  public token:any;

  constructor(
   private _rolService: RolService,
   private _cookieService: CookieService,
   private _router: Router,
  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    
  }

  registrar(registroForm: any){
    //validar si el formulario es valido
    if(registroForm.valid){
       console.log('this.rol: ',this.rol);

        //llamar al servicio crear_rol
        this._rolService.crear_rol(this.rol,this.token).subscribe(
          response=>{
            console.log('response: ',response);
            //valido que response no sea undefined
            if (response.data == undefined) {
              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: response.message,
              });
              //this.btn_actualizar = false;
    
            } else {
            //this.btn_actualizar = false;
            // setTimeout(()=> {
            //   this.btn_actualizar=false;
            // }, 4000);
    
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: response.message,
            });
    
            this._router.navigate(['/rol']);
            }
          },
          error=>{
            console.log('error: ',error);
          }
        )
    } else{
      console.log('formulario no valido');
    }
  }
}
