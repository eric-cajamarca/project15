import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoriaService } from 'src/app/services/categoria.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-create-categorias',
  templateUrl: './create-categorias.component.html',
  styleUrls: ['./create-categorias.component.css']
})
export class CreateCategoriasComponent {
  public categorias: any = {};
  public token: any = '';
  
  public btn_registrar = false;


  constructor(
    private _cookieService: CookieService,
    //private _adminService: AdminService,
    private _categoriaService: CategoriaService,
    private _router: Router
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
  }

  registrar(registroForm:any) {
    console.log('Formulario enviado', this.categorias);
    this._categoriaService.crear_categoria(this.categorias, this.token).subscribe(
      response=>{
        console.log('response');
        console.log(response);
        if(response == undefined){
          console.log('Catgoría no creada');
          
        }else{
          console.log('Categoría creada');
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#008000',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'La categoría se creó correctamente',
          });

          //redireccionar a la lista de marcas
          this._router.navigate(['/categorias']);

        }
      }
    );
  } 
}
