import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { ApiperuService } from 'src/app/services/apiperu.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { EmpresaService } from 'src/app/services/empresa.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.css']
})
export class UpdateEmpresaComponent {


  public empresa: any = {};

  public filtro: any = "";
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
    private _route: ActivatedRoute
    
  ) {
    this.token = this._cookieService.get('token');

    this.direccionEmpresas.codpais = 'PEN';


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

    console.log('this.direccionEmpresas', this.direccionEmpresas);
  }

  ngOnInit() {
    //quiero obtener el id de la empresa que lo estoy pasando como parametro en la url
     this._route.params.subscribe(params => {
      let id = params['id'];
      console.log('id', id);
      this._empresasService.getEmpresas_id(id, this.token).subscribe(
        response => {
          console.log('response', response);
          //convetir el array response.data a un objeto this.empresas
          this.empresas = response[0];




          
         
          console.log('this.empresas', this.empresas);
        }
      )
    });



    this.select_pais();
  }

  //https://dniruc.apisperu.com/api/v1/dni/45633353?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNvcnRpemd1ZXZhcmFAZ21haWwuY29tIn0.-cs9eKiQegcTM0bbaz7O-BT_sS7_BpV_6cndIqCeHfk

  buscar() {
    // this.contBuscar = 1;
    // console.log('veo que cod comprobante', this.empresas.idDocumento)

    // console.log('filtro', this.empresas.ruc);
    // this.filtro = this.empresas.ruc;

    // try {

    //   if (this.empresas.ruc.length === 11 && this.empresas.idDocumento === '6') {
    //     this._apiperuService.getRucInfo(this.filtro).subscribe(
    //       response => {
    //         this.clienteruc = response;
    //         //divido los datos de la despuesta
    //         this.empresas.rSocial = response.razonSocial;
    //         this.empresas.condicion = response.estado
  
  
    //         ///////////
    //         this.direccionEmpresas.codpais = "PEN";
    //         this.direccionEmpresas.ubigeo = response.ubigeo;
    //         this.direccionEmpresas.region = response.departamento;
    //         this.direccionEmpresas.provincia = response.provincia;
    //         this.direccionEmpresas.distrito = response.distrito;
    //         this.direccionEmpresas.direccion = response.direccion;
  
    //         console.log('this.clienteruc: ', this.clienteruc);
    //       },
    //       error => {
    //         iziToast.show({
    //           title: 'ERROR',
    //           titleColor: '#FF0000',
    //           color: '#FFF',
    //           class: 'text-danger',
    //           position: 'topRight',
    //           message: 'Error al realizar la consulta por falta de datos'
    //         });
    //       });

    //   }
      




    //   if (this.empresas.ruc.length === 8 && this.empresas.idDocumento === '1') {
    //     this._apiperuService.getDniInfo(this.filtro).subscribe(
    //       response => {
    //         this.clienteruc = response;
    //         //divido los datos de la despuesta
    //         this.empresas.rSocial = response.apellidoPaterno + ' ' + response.apellidoMaterno + ', ' + response.nombres;


    //         console.log('this.clienteruc: ', this.clienteruc);
    //       },
    //       error => {
    //         iziToast.show({
    //           title: 'ERROR',
    //           titleColor: '#FF0000',
    //           color: '#FFF',
    //           class: 'text-danger',
    //           position: 'topRight',
    //           message: 'Error al realizar la consulta por falta de datos '
    //         });
    //       });

    //   }
    // } catch (error) {
    //   iziToast.show({
    //     title: 'ERROR',
    //     titleColor: '#FF0000',
    //     color: '#FFF',
    //     class: 'text-danger',
    //     position: 'topRight',
    //     message: 'Ingrese un número de DNI o Ruc'
    //   });
    // }





  }


  select_pais() {


    let pais = 'Perú';
    // this.direccionEmpresas.pais = pais;


    if (this.direccionEmpresas.codpais == 'PEN') {
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

      this.direccionEmpresas.region = '';
      this.direccionEmpresas.provincia = '';
      this.direccionEmpresas.distrito = '';

    }
  }


  select_region() {

    this.provincias = [];
    setTimeout(() => {
      $('#sl-provincia').prop('disabled', false);
      $('#sl-distrito').prop('disabled', true);
    }, 50);
    this.direccionEmpresas.provincia = '';
    this.direccionEmpresas.distrito = '';
    this._adminService.get_Procincias().subscribe(
      response => {
        response.forEach((element: any) => {
          if (element.department_id == this.direccionEmpresas.region) {
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

    this.direccionEmpresas.distrito = '';

    this._adminService.get_Distritos().subscribe(
      response => {
        response.forEach((element: any) => {
          if (element.province_id == this.direccionEmpresas.provincia) {
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
    this.direccionEmpresas.ubigeo = selectedId;
    console.log(this.direccionEmpresas.ubigeo);
  }

  registrar(registroForm: any){

    console.log('this.cliientes', this.empresas);
    console.log('this.direccionEmpresas', this.direccionEmpresas);

    // if (registroForm.valid) {
      this.btn_registrar = true;
      this.data = this.empresas;
      console.log('this.data', this.data);
      //convertir array this.clientes a un objeto para pasarlo a mi servicio
      //  this.data.forEach((element: { id: string | number; name: any; }) => {
      //   this.data[element.id] = element.id;
      //  });

      //  console.log('this.data como objeto', this.data);
      this._empresasService.createEmpresa(this.data, this.token).subscribe(
        response => {
          if(response.data != undefined){
            this._empresasService.getEmpresas_id(this.empresas.ruc,this.token).subscribe(
              response => {
                console.log('response.data', response.data);
                this.direccionEmpresas.idCliente = response.data[0].idCliente;
                console.log('this.direccionEmpresas con idCliente', this.direccionEmpresas);
                if(response.data != undefined){
                  this._empresasService.createDireccionEmpresa(this.token, this.direccionEmpresas).subscribe(
                      response => {
                        if(response.data != undefined){
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
          }else{
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

  onCheckboxChange(){
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
