import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'cors';
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
   
    idDocumento: '',
    ruc: '',
    razon_Social: '',
    nombre_Comercial: '',
    rubro: '',
    celular: '',
    correo: '',
    password: '',
    logo:'',
    condicion: '',
    estSunat: '',
   
  };

  public filtro: any = "";
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
  public load_create = false;

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
            if (response.success == false) {
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
            } else {
              this.clienteruc = response;
              //divido los datos de la despuesta
              this.empresa.rSocial = response.razonSocial;
              this.empresa.condicion = response.estado
              this.empresas.idDocumento = '6';


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
            if (response.success == false) {
              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: 'Error al realizar la validación'
              });
              this.encontrado = false;
            } else {
              this.clienteruc = response;
              this.empresas.idDocumento = '1';
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


  registrar() {

    //quiero validar si el email es correcto
    if (this.empresa.email == '') {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un email'
      });
      return;
    }

    //quiero comparar si el password y el repitPassword son iguales
    if (this.empresa.password != this.empresa.repitPassword) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Las contraseñas no coinciden'
      });
      return;
    }



    this.empresas.ruc = this.empresa.ruc;
    this.empresas.password = this.empresa.password;
    this.empresas.correo = this.empresa.email;

    this.empresas.razon_Social = this.empresa.rSocial;
    this.empresas.nombre_Comercial = this.clienteruc.nombreComercial;
    this.empresas.condicion = this.clienteruc.condicion;
    this.empresas.estSunat = this.clienteruc.estado;

    


    console.log('this.cliientes', this.empresa);
    console.log('this.empresas', this.empresas);
    console.log('this.direccionEmpresas', this.direccionEmpresas);

    this.btn_registrar = true;
    this.data = this.empresas;
    console.log('this.data', this.data);


    //  console.log('this.data como objeto', this.data);
    this._empresasService.createEmpresa(this.data, this.token).subscribe(
      response => {
        if (response.data != undefined) {
          console.log('response.data aqui recibo el id de la empresa creada', response.data);
          this.direccionEmpresas.idEmpresa = response.data;
          this._empresasService.createDireccionEmpresa(this.direccionEmpresas,this.token).subscribe(
            response => {
              if (response.data != undefined) {
                iziToast.show({
                  title: 'SUCCESS',
                  titleColor: '#006064',
                  color: '#FFF',
                  class: 'text-success',
                  position: 'topRight',
                  message: 'Empresa creada correctamente'
                });
                this.btn_registrar = false;
                this.load_create = true;
                //quiero redirigir a la pagina de index-clientes
                // this._router.navigate(['/empresa']);
              }

            },
            error => {
              console.log(<any>error);
              console.error('Error al crear la Empresa:', error);
              this.btn_registrar = false;
            }
          )
        }else{
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: response.message
          });
          return;
        }
        
        this.btn_registrar = false;
      },
      error => {
        console.log(<any>error);
        console.error('Error al crear la empresa:', error);
        this.btn_registrar = false;

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Error al crear la empresa'
        });
        
      }

    )

  }



}
