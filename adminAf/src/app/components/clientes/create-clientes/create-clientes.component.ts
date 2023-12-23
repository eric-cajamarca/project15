import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import { DocumentoService } from 'src/app/services/documento.service';


declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css']
})
export class CreateClientesComponent implements OnInit {

  public filtro: any = "";
  public clientes: any = [];
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
  public direccionClientes: any = {

    ubigeo: '',
    codpais: 'PEN',
    region: '',
    provincia: '',
    distrito: '',
    principal: false,
    codLocal: '0',
    urbanizacion: '',
  };

  constructor(
    private _adminService: AdminService,
    private _cookieService: CookieService,
    private _documentosService: DocumentoService,
  ) {
    this.token = this._cookieService.get('token');

    this.direccionClientes.codpais = 'PEN';


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

    console.log('this.direccionClientes', this.direccionClientes);
  }

  ngOnInit() {
    this._documentosService.obtener_documento(this.token).subscribe(
      response => {
        this.documento = response.data;
        console.log('this.documento', this.documento);

        //convertir array de lista de roles this.roles a un objeto par usarlo en mi formulario
        //  this.documento.forEach((element: { id: string | number; name: any; }) => {
        //   this.documento[element.id] = element.id;
        //  });

      }
    );

    this.select_pais();
  }

  //https://dniruc.apisperu.com/api/v1/dni/45633353?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNvcnRpemd1ZXZhcmFAZ21haWwuY29tIn0.-cs9eKiQegcTM0bbaz7O-BT_sS7_BpV_6cndIqCeHfk

  buscar() {
    this.contBuscar = 1;
    console.log('veo que cod comprobante', this.clientes.idDocumento)

    console.log('filtro', this.clientes.ruc);
    this.filtro = this.clientes.ruc;

    try {

      if (this.clientes.ruc.length === 11 && this.clientes.idDocumento === '6') {
        this._adminService.getRucInfo(this.filtro).subscribe(
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
        this._adminService.getDniInfo(this.filtro).subscribe(
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

  registrar(registroForm: any) {

    console.log('this.cliientes', this.clientes);

    if (registroForm.valid) {
      this.btn_registrar = true;


    }
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
