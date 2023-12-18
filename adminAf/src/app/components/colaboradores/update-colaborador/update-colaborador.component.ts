import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { RolService } from 'src/app/services/rol.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-update-colaborador',
  templateUrl: './update-colaborador.component.html',
  styleUrls: ['./update-colaborador.component.css']
})
export class UpdateColaboradorComponent {


  public colaborador: any = {};
  // public colaborador_const: any = {};
  // public colaborador: Array<any> = [];

  public btn_actualizar = false;
  public token: any = "";
  public id = '';
  public load_data = false;
  public data = false;
  public roles: any[] = [];

  constructor(
    private _adminservice: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cookieService: CookieService,
    private _rolService: RolService,
  ) { 
    this.token = this._cookieService.get('token');
  };


  ngOnInit(): void {
    this._route.params.subscribe(
      params => {

        this.id = params['id'];
        this.load_data = true;
        this._adminservice.obtener_datos_colaborador_admin(this.id, this.token).subscribe(
          response => {

            console.log('reponse: ', response);

            if (response.data != undefined) {
              // Modificar el campo 'password' dentro del array 'data'
              response.data.forEach((item:any) => {
                this.colaborador.idUsuario = item.idUsuario;
                this.colaborador.nombres = item.nombres;
                this.colaborador.apellidos = item.apellidos;
                this.colaborador.email = item.email;
                this.colaborador.password  = '';
                this.colaborador.idRol = item.idRol;
                this.colaborador.fregistro = item.fregistro;
              });

              
              console.log('colaborador: ', this.colaborador);
              // this.colaborador = response;             
              this.data = true;
              this.load_data = false;
             }else {
              this.data = false;
              this.load_data = false;
            }
            
            
          }

        );

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
    );
  }

  actualizar(updateForm: any) {
    if (updateForm.valid) {
      this.btn_actualizar = true;

      console.log('updateForm: ', this.colaborador);
      if(this.colaborador.password == ''){
        console.log('pasword vacio');
        this.colaborador.password = 'sin datos'
      }else{
        console.log('pasword con datos');
        
      }
      console.log('this.colaborador: ', this.colaborador);

      //quiero cambiar el valor de this.colaborador.idRol por el valor de this.roles seleccionado en el select del html
      //  this.roles.forEach((item:any) => {
      //     if(item.idRol == this.colaborador.idRol){
      //       this.colaborador.idRol = item.id;
      //     }
      //   });

      this._adminservice.editar_colaborador_admin(this.id, this.colaborador, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message,
            });
            this.btn_actualizar = false;

          } else {
            this.btn_actualizar = false;
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

            this._router.navigate(['/colaborador']);
          }

        }
      )

    } else {
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
