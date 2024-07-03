import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { variosService } from 'src/app/services/varios.service';

declare var $: any;
declare var iziToast: any;
declare var bootstrap: any;

@Component({
  selector: 'app-index-categorias',
  templateUrl: './index-categorias.component.html',
  styleUrls: ['./index-categorias.component.css']
})
export class IndexCategoriasComponent {
  public categorias: Array<any> = [];
  public categorias_const: Array<any> = [];
  public prod_Modificar: any = {};
  public load_estado = false;
  public token: any = '';
  
  constructor(
    private _router: Router,
    private _cookieService: CookieService,
    private _adminService: AdminService,
    private _categoriaService: CategoriaService,
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngAfterViewInit(): void {
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  }

  ngOnInit(): void {
    this.initData();

  }

  initData() {
    this._categoriaService.obtener_categorias(this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          console.log('No hay datos');
        } else {
          this.categorias = response.data;
          this.categorias_const = response.data;
        }
      },
      error => {
        console.log('Error al obtener marcas');
        console.log(<any>error);
      }
    );
  }

  cambiarEstado(id: any, estado: any) {
    console.log('Cambiar estado de la marca: ', id, estado);
    // this._categoriaService.editarEstadoMarca(id, estado,this.token).subscribe(
    //   response => {
    //     console.log('response.data');
    //     console.log(response.data);
    //     if (response.data == undefined) {

    //       console.log('No hay datos');
    //     } else {
    //       this.marcas = response.data;
          

    //       iziToast.show({
    //         title: 'SUCCESS',
    //         titleColor: '#008000',
    //         color: '#FFF',
    //         class: 'text-success',
    //         position: 'topRight',
    //         message: 'El estado de la marca ha sido actualizado correctamente',
    //       });
    //       this.initData();
    //       // $('body').removeClass('modal-open');
    //       // $('.modal-backdrop').remove();
    //       // //habilitar el scroll en el body en el componente
    //       // $('body').css('overflow-y', 'auto');


    //     }
    //   },
    //   error => {
    //     console.log('Error al obtener marcas');
    //     //console.log(<any>error);
    //   }
    // );

  }

  seleccionar(id: any) {
    console.log('Seleccionar CATEGORIAS con id: ', id);
    console.log('this.CATEGORIASs_const', this.categorias_const);

    // //quiero buscar el id en el array de categorias y extraer el objeto
    // const idEncontrado = this.categorias_const.filter((item: any) => item.idCategoria == id);
    // this.prod_Modificar = idEncontrado[0];
    // console.log('this.prod_Modificar', this.prod_Modificar);
    
    

    this._categoriaService.obtener_categoria_id(id, this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          console.log('No hay datos');
        } else {
          
          this.prod_Modificar = response.data[0];
          console.log('this.prod_Modificar');
          console.log(this.prod_Modificar);
          $('#modalModificar').modal('show');
        }
      },
      error => {
        console.log('Error al obtener marcas');
        console.log(<any>error);
      }
    );


  }

  
  editarCategorias(id: number) {
    console.log('Editar marca con id: ', id , this.prod_Modificar);
    this._categoriaService.editar_categoria(this.prod_Modificar.idCategoria, this.prod_Modificar, this.token).subscribe(
      response=>{
        
        console.log('response.data', response.data);
        if(response.data == undefined){
          console.log('No hay datos');
        }else{
          this.categorias = response.data;
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#008000',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'La marca ha sido editada correctamente',
          });
          this.initData();
          $('#modalModificar').modal('hide');
        }
      
      },
      error => {
        console.log('Error al obtener marcas');
        console.log(<any>error);
      }
    );

  }

  deleteMarca(id: number) {
    console.log('Eliminar marca con id: ', id);
    this._categoriaService.editar_categoria(id, this.categorias, this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          console.log('No hay datos');
        } else {
          this.categorias = response.data;
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#008000',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'La marca ha sido eliminada correctamente',
          });
          this.initData();
        }
      }
    );
  }

}
