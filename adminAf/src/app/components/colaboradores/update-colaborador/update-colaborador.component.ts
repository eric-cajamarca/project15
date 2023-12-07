import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor(
    private _adminservice: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cookieService: CookieService,
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
                this.colaborador.id = item.id;
                this.colaborador.name = item.name;
                this.colaborador.apellidos = item.apellidos;
                this.colaborador.email = item.email;
                this.colaborador.password  = '';
                this.colaborador.rol = item.rol;
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
            
            // this.colaborador_const = this.colaborador;
          }

        );

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
