import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { variosService } from 'src/app/services/varios.service';


declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-create-marca',
  templateUrl: './create-marca.component.html',
  styleUrls: ['./create-marca.component.css']
})
export class CreateMarcaComponent {

  public marca: any = {};
  public token: any = '';
  
  public btn_registrar = false;


  constructor(
    private _cookieService: CookieService,
    //private _adminService: AdminService,
    private _marcaService: variosService,
    private _router: Router
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
  }

  registrar(registroForm:any) {
    console.log('Formulario enviado', this.marca);
    this._marcaService.crearMarca(this.marca, this.token).subscribe(
      response=>{
        console.log('response');
        console.log(response);
        if(response == undefined){
          console.log('Marca no creada');
          
        }else{
          console.log('Marca creada');
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#008000',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'La marca se creó correctamente',
          });

          //redireccionar a la lista de marcas
          this._router.navigate(['/marcas']);

        }
      }
    );
  } 
}
