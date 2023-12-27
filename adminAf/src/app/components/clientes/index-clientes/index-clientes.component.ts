import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit{
  public clientes: Array<any> = [];
  public clientes_const: Array<any> = [];
  public token: any = "";

  public page = 1;
  public pageSize = 10;
  public filtro = '';
 
  
  public load_estado = false;

  constructor(
    private _adminService: AdminService,
    private _clientesService: ClienteService,
    private _cookieService: CookieService,
  ) {
    this.token = this._cookieService.get('token');
  }
  

 

  ngOnInit(): void {

    this.init_data();

   
    
  }

  init_data() {
    this.load_estado = true;
    this._clientesService.obtener_clientes(this.token).subscribe(
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
            message: 'Usted no tiene acceso a clientes'
          });
          this.load_estado = false;
        } else {
          this.clientes = response.data;
          this.clientes_const = response.data;
          this.load_estado = false;
        }
      },
      error => {
        console.log('error', error);
      }
    );
  }


  filtrar() {
    if (this.filtro) {
      //
      var term = new RegExp(this.filtro, 'i');
      this.clientes = this.clientes_const.filter(item => term.test(item.rSocial) || term.test(item.apellidos) || term.test(item.correo) || term.test(item.ruc));
    } else {
      this.clientes = this.clientes_const;
    }
  }

  set_state(id: any, condicion: any) {
    console.log($);
    console.log('id', id);
    console.log('condicion', condicion);
    this.load_estado = true;
    this._clientesService.cambiar_estado_clientes(id, { condicion: condicion }, this.token).subscribe(
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

  eliminar(id: any) {
    console.log($);
    console.log('id', id);
    
    this.load_estado = true;
    this._clientesService.eliminar_direccionCliente(id, this.token).subscribe(
      response => {
        console.log('response.data', response.data);
      }
    )

    this._clientesService.eliminar_cliente(id, this.token).subscribe(
      response => {
        this.load_estado = false;
        if(response.data != undefined){
          iziToast.show({
            title: 'success',
            titleColor: '#00FF00',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Cliente eliminado correctamente'
          });

        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        //habilitar el scroll en el body en el componente
        $('body').css('overflow-y', 'auto');


         this.init_data();
        }
        //quiero cerrar el modal usando jquery sabiendo que el id="delete-{{item.id}}"

        
      }
    );



  }

}
