import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from 'src/app/services/rol.service';

declare var iziToast: any;
declare var $: any;



@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.css']
})
export class UpdateRolComponent implements OnInit {
  public token: any = '';
  public rol: any = {};
  public id: any;
  public load_data: boolean = false;

  constructor(
    private _Route: ActivatedRoute,
    private _cookieService: CookieService,
    private _rolService: RolService,
    private _router: Router,
  ) {
    this.token = this._cookieService.get('token');
  }


  ngOnInit(): void {
    this._Route.params.subscribe(
      params => {
        console.log('params: ', params);
        this.id = params['id'];
        console.log('this.id: ', this.id);

        this._rolService.obtener_rol_id(this.id, this.token).subscribe(
          response => {
            console.log('response: ', response);
            this.rol = response;
            // this.rol = this.rol[0].descripcion;
            // this.load_data = true;


            //convertir this.rol a un objeto par usarlo en mi formulario
            this.rol = {
              descripcion: this.rol[0].descripcion,
              id: this.rol[0].id,

            }

            console.log('this.rol: ', this.rol);
          },
          error => {
            console.log('error: ', error);
          }
        )
      }
    )



  }

  actualizar(updateForm: any) {
    //validar si el formulario es valido
    if (updateForm.valid) {
      console.log('this.rol: ', this.rol);
      this._rolService.actualizar_rol(this.id, this.rol, this.token).subscribe(
        response=>{
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
        }
      );
    }
  }

}
