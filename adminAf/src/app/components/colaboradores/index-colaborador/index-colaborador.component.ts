import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-index-colaborador',
  templateUrl: './index-colaborador.component.html',
  styleUrls: ['./index-colaborador.component.css']
})


export class IndexColaboradorComponent implements OnInit {

  public clientes: Array<any> = [];
  public clientes_const: Array<any> = [];
  public token: any = "";

  public page = 1;
  public pageSize = 10;
  public filtro = '';
  public colaboradores: Array<any> = [];
  public colaboradores_const: Array<any> = [];

  public load_estado = false;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _cookieService: CookieService,
  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {

    this.init_data();
  }

  init_data() {
    this._adminService.getAdmin(this.token).subscribe(
      response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Usted no tiene acceso a colaboradores'
          });
          this._router.navigate(['/']);
        } else {
          this.colaboradores = response.data;
          this.colaboradores_const = this.colaboradores;
          console.log(this.colaboradores);
        }

      }
    )


  }

  filtrar() {
    if (this.filtro) {
      //
      var term = new RegExp(this.filtro, 'i');
      this.colaboradores = this.colaboradores_const.filter(item => term.test(item.nombres) || term.test(item.apellidos) || term.test(item.email) || term.test(item.n_doc));
    } else {
      this.colaboradores = this.colaboradores_const;
    }
  }

  set_state(id: any, estado: any) {
    console.log($);
    console.log('id', id);
    this.load_estado = true;
    this._adminService.cambiar_estado_colaborador_admin(id, { estado: estado }, this.token).subscribe(
      response => {
        this.load_estado = false;
        //quiero cerrar el modal usando jquery sabiendo que el id="delete-{{item.id}}"

        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        //habilitar el scroll en el body en el componente
        $('body').css('overflow-y', 'auto');


        this.init_data();
      }
    );



  }



  generateColor(initial: string): string {
    const charCode = initial.charCodeAt(0);
    const colors = ['MediumAquamarine', 'Coral', 'MediumPurple', 'SeaGreen'];
    const index = charCode % 4; // Ajusta el índice para obtener un color de la matriz de colores
    const color = colors[index];
    // console.log('Color generado:', color); 
    // Imprime el color generado en la consola
    return color;
  }


}
