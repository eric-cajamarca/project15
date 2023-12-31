import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { RolService } from 'src/app/services/rol.service';

declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-create-colaborador',
  templateUrl: './create-colaborador.component.html',
  styleUrls: ['./create-colaborador.component.css']
})
export class CreateColaboradorComponent {


  public colaborador:any = {
    estado : false
  };

  public roles:any[] = [];
  public btn_registrar = false;
  public token:any = "";

  constructor(
    private _colaboradorService:AdminService,
    private _router:Router,
    private _cookieService: CookieService,
    private _rolService: RolService,
  ) { 
    this.token = this._cookieService.get('token');
  };

  ngOnInit(): void {

    this._rolService.obtener_roles(this.token).subscribe(
      response => {
        console.log('response.data', response.data);
        
        if (response.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Usted no tiene acceso a roles'
          });
          //this._router.navigate(['/']);
        } else {
          this.roles = response.data;
          console.log('this.roles: ', this.roles);
          //convertir array de lista de roles this.roles a un objeto par usarlo en mi formulario
          
          


          console.log(this.roles);
        }

      }
    )

  }

  registrar(registroForm:any){
    console.log('registroForm');
    console.log(registroForm);
    if(registroForm.valid){
      this.btn_registrar=true;

      console.log('variable colaborador', this.colaborador);

      this._colaboradorService.registro_colaborador_admin(this.colaborador,this.token).subscribe(
        response=>{
          console.log('data:',response.data);
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message,
            });
            this.btn_registrar=false;

          }else{
             this.btn_registrar=false;
            // setTimeout(()=> {
            //   this.btn_registrar=false;
            // }, 4000);

            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registró correctamente el colaborador.'
          });

          this._router.navigate(['/colaborador']);
          }
          
        }
      )
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
    });
    }
  }

  
}
