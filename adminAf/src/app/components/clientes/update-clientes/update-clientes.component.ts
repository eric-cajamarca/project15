import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { ApiperuService } from 'src/app/services/apiperu.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DocumentoService } from 'src/app/services/documento.service';


declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-update-clientes',
  templateUrl: './update-clientes.component.html',
  styleUrls: ['./update-clientes.component.css']
})
export class UpdateClientesComponent {

  public filtro: any = "";
  public clientes: any = {
    correo: '',
    celular: '',
    condicion: 'ACTIVO',
  };
  public clienteruc: any = [];
  // public direccionClientes:any=[];
  public documento: any = [];
  public regiones: any = [];
  public provincias: any = [];
  public distritos: any = [];
  public token: any = "";
  public contBuscar = 0;
  public btn_registrar = false;
  public mostrarDireccion = false;

  public str_pais = '';
  public direccionClientes: any = {};
  public direccionClientes_const: any = [];
  public data: any = {};

  constructor(
    private _adminService: AdminService,
    private _cookieService: CookieService,
    private _documentosService: DocumentoService,
    private _apiperuService: ApiperuService,
    private _clientesService: ClienteService,
    private _router: Router,
    private _route: ActivatedRoute,


  ) {
    this.token = this._cookieService.get('token');



    this._adminService.get_Regiones().subscribe(
      response => {
        this.regiones = response;
        console.log('this.regiones', this.regiones);
      }
    );

    this._adminService.get_Procincias().subscribe(
      response => {
        this.provincias = response;
        console.log('this.provincias', this.provincias);
      }
    );

    this._adminService.get_Distritos().subscribe(
      response => {
        this.distritos = response;
        console.log('this.distritos', this.distritos);
      }
    );

    this._documentosService.obtener_documento(this.token).subscribe(
      response => {
        this.documento = response.data;
        console.log('this.documento', this.documento);
      }
    );


  }

  ngOnInit() {
    this._route.params.subscribe(
      params => {

        this.clientes.idCliente = params['id'];
        console.log('this.clientes.idCliente', this.clientes.idCliente);

        this._clientesService.obtener_cliente_id(this.clientes.idCliente, this.token).subscribe(
          response => {
            console.log('response.data', response.data);
            if (response.data != undefined) {


              // Modificar el campo 'password' dentro del array 'data'
              response.data.forEach((item: any) => {
                this.clientes.idCliente = item.idCliente;
                this.clientes.ruc = item.ruc;
                this.clientes.idDocumento = item.idDocumento;
                this.clientes.rSocial = item.rSocial;
                this.clientes.correo = item.correo;
                this.clientes.celular = item.celular;
                this.clientes.condicion = item.condicion;
                // this.clientes.fregistro = item.fregistro;
              });
              console.log('this.clientes', this.clientes);
            }
          }
        );

        this._clientesService.obtener_direccionesCliente_idCliente(this.clientes.idCliente, this.token).subscribe(
          response => {
            console.log('response.data', response.data);
            if (response.data != undefined) {

              this.direccionClientes_const = response.data;
              console.log('this.direccionClientes_const', this.direccionClientes_const);

              //buscar en regiones por el id de response.data.region y asignar el name a direccionEmpresas.region
              const regionEncontrada = this.regiones.find((element: any) => Number(element.id) === Number(response.data[0].region));

              if (regionEncontrada) {

                this.direccionClientes_const[0].nregion = String(regionEncontrada.name);
                console.log('this.direccionEmpresas.region', this.direccionClientes_const.nregion);
              }else{
                console.log('no se encontro la region');
              }


              //buscar en provincias por el id de response.data.provincia y asignar el name a direccionEmpresas.provincia
              const provinciaEncontrada = this.provincias.find((element: any) => Number(element.id) === Number(response.data[0].provincia));

              if (provinciaEncontrada) {

                this.direccionClientes_const[0].nprovincia = String(provinciaEncontrada.name);
                console.log('this.direccionEmpresas.provincia', this.direccionClientes_const.nprovincia);
              }

              //buscar en distritos por el id de response.data.distrito y asignar el name a direccionEmpresas.distrito
              const distritoEncontrada = this.distritos.find((element: any) => Number(element.id) === Number(response.data[0].distrito));

              if (distritoEncontrada) {

                this.direccionClientes_const[0].ndistrito = String(distritoEncontrada.name);
                console.log('this.direccionEmpresas.distrito', this.direccionClientes_const.ndistrito);
              }

              console.log('this.direccionClientes', this.direccionClientes_const);
            }
          }
        )
      }

    );



    // this.select_pais();
  }

  //https://dniruc.apisperu.com/api/v1/dni/45633353?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNvcnRpemd1ZXZhcmFAZ21haWwuY29tIn0.-cs9eKiQegcTM0bbaz7O-BT_sS7_BpV_6cndIqCeHfk

  buscar() {
    this.contBuscar = 1;
    console.log('veo que cod comprobante', this.clientes.idDocumento)

    console.log('filtro', this.clientes.ruc);
    this.filtro = this.clientes.ruc;

    try {

      if (this.clientes.ruc.length === 11 && this.clientes.idDocumento === '6') {
        this._apiperuService.getRucInfo(this.filtro).subscribe(
          response => {
            this.clienteruc = response;
            //divido los datos de la despuesta
            this.clientes.rSocial = response.razonSocial;
            this.clientes.condicion = response.estado


            ///////////
            this.direccionClientes.codpais = "PEN";
            this.direccionClientes.ubigeo = response.ubigeo;
            this.direccionClientes.region = response.departamento;
            this.direccionClientes.provincia = response.provincia;
            this.direccionClientes.distrito = response.distrito;
            this.direccionClientes.direccion = response.direccion;

            console.log('this.clienteruc: ', this.clienteruc);
          },
          error => {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'Error al realizar la consulta por falta de datos'
            });
          });

      }





      if (this.clientes.ruc.length === 8 && this.clientes.idDocumento === '1') {
        this._apiperuService.getDniInfo(this.filtro).subscribe(
          response => {
            this.clienteruc = response;
            //divido los datos de la despuesta
            this.clientes.rSocial = response.apellidoPaterno + ' ' + response.apellidoMaterno + ', ' + response.nombres;


            console.log('this.clienteruc: ', this.clienteruc);
          },
          error => {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'Error al realizar la consulta por falta de datos '
            });
          });

      }
    } catch (error) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un número de DNI o Ruc'
      });
    }





  }


  select_pais() {


    let pais = 'Perú';
    // this.direccionClientes.pais = pais;


    if (this.direccionClientes.codpais == 'PEN') {
      setTimeout(() => {
        $('#sl-region').prop('disabled', false);
      }, 50);
      this._adminService.get_Regiones().subscribe(
        response => {
          console.log(response);
          response.forEach((element: any) => {
            this.regiones.push({
              id: element.id,
              name: element.name
            });
          });

        }
      );
    } else {
      setTimeout(() => {
        $('#sl-region').prop('disabled', true);
        $('#sl-provincia').prop('disabled', true);
        $('#sl-distrito').prop('disabled', true);
      }, 50);
      this.regiones = [];
      this.provincias = [];
      this.distritos = [];

      this.direccionClientes.region = '';
      this.direccionClientes.provincia = '';
      this.direccionClientes.distrito = '';

    }
  }


  select_region() {

    this.provincias = [];
    setTimeout(() => {
      $('#sl-provincia').prop('disabled', false);
      $('#sl-distrito').prop('disabled', true);
    }, 50);
    this.direccionClientes.provincia = '';
    this.direccionClientes.distrito = '';
    this._adminService.get_Procincias().subscribe(
      response => {
        response.forEach((element: any) => {
          if (element.department_id == this.direccionClientes.region) {
            this.provincias.push(
              element
            );
          }
        });
        console.log(this.provincias);


      }
    );
  }

  select_provincia() {
    this.distritos = [];
    setTimeout(() => {
      $('#sl-distrito').prop('disabled', false);
    }, 50);

    this.direccionClientes.distrito = '';

    this._adminService.get_Distritos().subscribe(
      response => {
        response.forEach((element: any) => {
          if (element.province_id == this.direccionClientes.provincia) {
            this.distritos.push(element);
            // this.direccion.zip = this.distritos.forEach(element.id);
          }
        });
        console.log(this.distritos);



      }
    );
  }

  select_distrito(event: any) {
    const selectedId = event.target.value;
    this.direccionClientes.ubigeo = selectedId;
    console.log(this.direccionClientes.ubigeo);
  }


  editarDireccion(id: string) {}

  actualizarDireccion() {}

  registrar(registroForm: any) {

    console.log('this.cliientes', this.clientes);
    console.log('this.direccionClientes', this.direccionClientes);

    // if (registroForm.valid) {
    this.btn_registrar = true;
    this.data = this.clientes;
    console.log('this.data', this.data);
    //convertir array this.clientes a un objeto para pasarlo a mi servicio
    //  this.data.forEach((element: { id: string | number; name: any; }) => {
    //   this.data[element.id] = element.id;
    //  });

    //  console.log('this.data como objeto', this.data);
    this._clientesService.crear_cliente(this.data, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          this._clientesService.obtener_cliente_id(this.clientes.ruc, this.token).subscribe(
            response => {
              console.log('response.data', response.data);
              this.direccionClientes.idCliente = response.data[0].idCliente;
              console.log('this.direccionClientes con idCliente', this.direccionClientes);
              if (response.data != undefined) {
                this._clientesService.crear_direccionCliente(this.token, this.direccionClientes).subscribe(
                  response => {
                    if (response.data != undefined) {
                      iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#006064',
                        color: '#FFF',
                        class: 'text-success',
                        position: 'topRight',
                        message: 'Cliente creado correctamente'
                      });
                      this.btn_registrar = false;
                      //quiero redirigir a la pagina de index-clientes
                      this._router.navigate(['/cliente']);
                    }

                  },
                  error => {
                    console.log(<any>error);
                    console.error('Error al crear el cliente:', error);
                    this.btn_registrar = false;
                  }
                )
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
            message: response.message,
          });
          this.btn_registrar = false;
        }
        console.log(response.data);
        this.btn_registrar = false;
      },
      error => {
        console.log(<any>error);
        console.error('Error al crear el cliente:', error);
        this.btn_registrar = false;
      }

    )

  }

  onCheckboxChange() {
    if (this.mostrarDireccion) {
      this.mostrarDireccion = true;
      console.log('El checkbox está marcado.', this.mostrarDireccion);

      // Realiza acciones cuando el checkbox está marcado
    } else {
      // this.mostrarDireccion = false;
      console.log('El checkbox está desmarcado.', this.mostrarDireccion);

      // Realiza acciones cuando el checkbox está desmarcado
    }

  }
}
