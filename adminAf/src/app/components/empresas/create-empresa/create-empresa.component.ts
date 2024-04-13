import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { ApiperuService } from 'src/app/services/apiperu.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { EmpresaService } from 'src/app/services/empresa.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-create-empresa',
  templateUrl: './create-empresa.component.html',
  styleUrls: ['./create-empresa.component.css']
})
export class CreateEmpresaComponent {

  public encontrado: any = false;
  public empresas: any = {
    ruc: '',
    rSocial: '',
    idDocumento: '',
    condicion: '',
    email: '',
    password: '',
    repitPassword: '',
    direccion: '',
    telefono: '',
    celular: '',
    idCliente: '',
    idDireccion: '',
    idEmpresa: '',
  }; public filtro: any = "";
  public empresa: any = {
    ruc: '',
    email: '',
    password: '',
    repitPassword: '',

  };
  public clienteruc: any = [];
  // public direccionEmpresas:any=[];
  public documento: any = [];
  public regiones: any = [];
  public provincias: any = [];
  public distritos: any = [];
  public token: any = "";
  public contBuscar = 0;
  public btn_registrar = false;
  public mostrarDireccion = false;

  public str_pais = '';
  public direccionEmpresas: any = {

    ubigeo: '',
    codpais: 'PEN',
    region: '',
    provincia: '',
    distrito: '',
    principal: false,
    codLocal: '0',
    urbanizacion: '',
  };
  public data: any = {};

  constructor(
    private _adminService: AdminService,
    private _cookieService: CookieService,
    private _documentosService: DocumentoService,
    private _apiperuService: ApiperuService,
    private _empresasService: EmpresaService,
    private _router: Router,

  ) {
    this.token = this._cookieService.get('token');
  }

  ngOnInit() {

  }


  buscar(ruc: any) {
    console.log('ingreso a buscar en la api', ruc);
    // this.contBuscar = 1;
    // console.log('veo que cod comprobante', this.empresa.idDocumento)

    // console.log('filtro', this.empresa.ruc);
    this.filtro = this.empresa.ruc;

    try {

      if (this.empresa.ruc.length === 11) {
        this._apiperuService.getRucInfo(this.filtro).subscribe(
          response => {
            if(response.success == false) {
              console.log('response', response);

              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: 'Error al realizar la validación'
              });
              this.encontrado = false;
            }else {
              this.clienteruc = response;
              //divido los datos de la despuesta
              this.empresa.rSocial = response.razonSocial;
              this.empresa.condicion = response.estado


              ///////////
              this.direccionEmpresas.codpais = "PEN";
              this.direccionEmpresas.ubigeo = response.ubigeo;
              this.direccionEmpresas.region = response.departamento;
              this.direccionEmpresas.provincia = response.provincia;
              this.direccionEmpresas.distrito = response.distrito;
              this.direccionEmpresas.direccion = response.direccion;

              console.log('this.clienteruc: ', this.clienteruc);
              this.encontrado = true;
            }
              
          },
          error => {
            
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'Error al realizar la validación'
            });

            this.encontrado = false;
          }
        );

      }





      if (this.empresa.ruc.length === 8) {
        this._apiperuService.getDniInfo(this.filtro).subscribe(
          response => {
            if(response.success == false) {
              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: 'Error al realizar la validación'
              });
              this.encontrado = false;
            }else {
              this.clienteruc = response;
              //divido los datos de la despuesta
              this.empresa.rSocial = response.apellidoPaterno + ' ' + response.apellidoMaterno + ', ' + response.nombres;
  
  
              console.log('this.clienteruc: ', this.clienteruc);
              this.encontrado = true;
            }

          },
          error => {
            
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'Error al realizar la validación'
            });

            this.encontrado = false;
          }
        );




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


  registrar(loginForm: any) {

    console.log('this.cliientes', this.empresa);
    console.log('this.direccionEmpresas', this.direccionEmpresas);

    // if (registroForm.valid) {
    this.btn_registrar = true;
    this.data = this.empresa;
    console.log('this.data', this.data);
    //convertir array this.clientes a un objeto para pasarlo a mi servicio
    //  this.data.forEach((element: { id: string | number; name: any; }) => {
    //   this.data[element.id] = element.id;
    //  });

    //  console.log('this.data como objeto', this.data);
    this._empresasService.createEmpresa(this.data, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          this._empresasService.getEmpresas_id(this.empresa.ruc, this.token).subscribe(
            response => {
              console.log('response.data', response.data);
              this.direccionEmpresas.idCliente = response.data[0].idCliente;
              console.log('this.direccionEmpresas con idCliente', this.direccionEmpresas);
              if (response.data != undefined) {
                this._empresasService.createDireccionEmpresa(this.token, this.direccionEmpresas).subscribe(
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
                      this._router.navigate(['/empresa']);
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



}
