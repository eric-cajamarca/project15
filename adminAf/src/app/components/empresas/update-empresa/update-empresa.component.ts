import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GLOBAL } from 'src/app/services/GLOBAL';
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

  public url: any;
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
    logo: '',
    condicion: '',
    estSunat: '',
    logoAnterior: ''

  };
  public clienteruc: any = [];
  public imgSelect: any | ArrayBuffer = '';
  public file: any = undefined;
  // public direccionEmpresas:any=[];
  public documento: any = [];
  public regiones: any = [];
  public provincias: any = [];
  public distritos: any = [];
  public token: any = "";
  public contBuscar = 0;
  public empConect: any = {};
  public btn_registrar = false;
  public mostrarDireccion = false;

  public str_pais = '';
  public direccionEmpresas: any = {};
  public direccionEmpresas_const: any = [];
  // public direccionModificada: any = {};

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
    this.url = GLOBAL.url;
    console.log('this.url', this.url);
    this.direccionEmpresas.codpais = 'PEN';
    this.empConect = this._adminService.idUser.empresa;
    console.log('this.empConect', this.empConect);

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

    this.initData();

    this.select_pais();
  }

  removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  initData() {
    //quiero obtener el id de la empresa que lo estoy pasando como parametro en la url

    this._empresasService.getEmpresas_id(this.empConect, this.token).subscribe(
      response => {
        console.log('response', response);
        //convetir el array response.data a un objeto this.empresas
        this.empresas = response.data[0];
        console.log('this.empresas', this.empresas);
      }
    )

    this._empresasService.getDireccionEmpresa_id(this.empConect, this.token).subscribe(
      response => {
        console.log('response', response);
        //convetir el array response.data a un objeto this.empresas
        this.direccionEmpresas_const = response.data;

        
        //recorrer del array this.direccionEmpresas_const  buscar en regiones por el id de response.data.region y asignar el name a direccionEmpresas.region
         this.direccionEmpresas_const.forEach((direccion: any) => {
          const regionEncontrada = this.regiones.find((element: any) => Number(element.id) === Number(direccion.region));
          if (regionEncontrada) {
            direccion.nregion = String(regionEncontrada.name);
          }

          //buscar en provincias por el id de response.data.provincia y asignar el name a direccionEmpresas.provincia
          const provinciaEncontrada = this.provincias.find((element: any) => Number(element.id) === Number(direccion.provincia));
          if (provinciaEncontrada) {
            direccion.nprovincia = String(provinciaEncontrada.name);
          }

          //buscar en distritos por el id de response.data.distrito y asignar el name a direccionEmpresas.distrito
          const distritoEncontrada = this.distritos.find((element: any) => Number(element.id) === Number(direccion.distrito));
          if (distritoEncontrada) {
            direccion.ndistrito = String(distritoEncontrada.name);
          }
        }
        );

        console.log('this.direccionEmpresas', this.direccionEmpresas_const)


      }
    )
  }


  buscar() { }


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


  onLogoChange(event: any): void {
    var file: any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay un imagen de envio'
      });
    }

    if (file.size <= 4000000) {

      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
        // if (
        //   file.type.startsWith('image/') ||
        //   file.type.startsWith('video/mp4') // Verificar si es una imagen o video
        // ) {
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;

      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }

    console.log(this.file);

  }



  editarDireccion(id: number) {
    // Limpiar la variable direccionEmpresas antes de buscar
    this.direccionEmpresas = {};

    console.log('ID:', id);

    // Buscar el objeto correspondiente en el array direccionEmpresas_const
    const direccion = this.direccionEmpresas_const.find((element: any) => element.idDireccionEmpresa === id);

    if (direccion) {
      console.log('Elemento encontrado:', direccion);
      // Clonar el objeto encontrado
      this.direccionEmpresas = { ...direccion }; //...este operador se utiliza para clonar un objeto
      console.log('Objeto clonado en this.direccionEmpresas:', this.direccionEmpresas);
    } else {
      console.log('No se encontró el ID:', id);
    }
  }

  actualizarDireccion() {
    console.log('Actualizo direccion de las Empresas:', this.direccionEmpresas);
    this._empresasService.updateDireccionEmpresa(this.direccionEmpresas, this.token).subscribe(
      response => {
        console.log('response', response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#0062cc',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Dirección actualizada correctamente'
        });
      }

    );
    this.initData();
  }

  modalCrearDireccion() {
    this.direccionEmpresas = {};
    this.direccionEmpresas.idEmpresa = this.empresas.idEmpresa;
    this.direccionEmpresas.idUsuario = this.empresas.idUsuario;
    this.direccionEmpresas.codpais = 'PEN';
    this.direccionEmpresas.nombre = this.empresas.alias;
    
  }

  crearDireccion() {
    console.log('Crear direccion de las Empresas:', this.direccionEmpresas);
    this._empresasService.createDireccionEmpresa(this.direccionEmpresas, this.token).subscribe(
      response => {
        console.log('response', response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#0062cc',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Dirección creada correctamente'
        });
      }
    );
    this.initData();
  }

  // registrar(registroForm: any) {

  //   console.log('this.cliientes', this.empresas);
  //   console.log('this.direccionEmpresas', this.direccionEmpresas);

  //   if (registroForm.valid) {
  //     if(this.empresas.logo){
  //       this.empresas.logoAnterior = this.empresas.logo;
  //     }else{
  //       this.empresas.logoAnterior = undefined;
  //     }

  //     if (this.file) {
                
  //       this.empresas.logo = this.file;

  //       this._empresasService.updateEmpresa(this.empresas.idEmpresa, this.empresas, this.token).subscribe(
  //         response => {
  //           console.log('response', response);
  //           iziToast.show({
  //             title: 'SUCCESS',
  //             titleColor: '#0062cc',
  //             color: '#FFF',
  //             class: 'text-success',
  //             position: 'topRight',
  //             message: 'Empresa actualizada correctamente'
  //           });
  //         }
  //       );

  //     } else {
  //       if (this.empresas.logo) {
  //         this.empresas.logo = undefined;

  //         this._empresasService.updateEmpresa(this.empresas.idEmpresa, this.empresas, this.token).subscribe(
  //           response => {
  //             console.log('response', response);
  //             iziToast.show({
  //               title: 'SUCCESS',
  //               titleColor: '#0062cc',
  //               color: '#FFF',
  //               class: 'text-success',
  //               position: 'topRight',
  //               message: 'Empresa actualizada correctamente'
  //             });
  //           }
  //         );

  //       } else {
  //         iziToast.show({
  //           title: 'ERROR',
  //           titleColor: '#FF0000',
  //           color: '#FFF',
  //           class: 'text-danger',
  //           position: 'topRight',
  //           message: 'tiene que subir una imagen para el logo de la empresa'
  //         });
  //       }
  //     }
  //   }
  // }

  registrar(registroForm: any) {
    console.log('this.empresas', this.empresas);
    console.log('this.direccionEmpresas', this.direccionEmpresas);
  
    if (!registroForm.valid) {
      return; // Salir temprano si el formulario no es válido.
    }
  
    // Establecer 'logoAnterior' basado en la existencia de 'logo'.
    this.empresas.logoAnterior = this.empresas.logo ? this.empresas.logo : undefined;
  
    // Si no hay archivo seleccionado y tampoco hay logo actual, mostrar error.
    if (!this.file && !this.empresas.logo) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe subir una imagen para el logo de la empresa.'
      });
      return;
    }
  
    // Si hay un archivo seleccionado, actualizar 'logo' con el archivo.
    if (this.file) {
      this.empresas.logo = this.file;
    } else {
      // Si no hay archivo pero sí un logo existente, se procede a eliminar el logo actual.
      this.empresas.logo = undefined;
    }
  
    // Llamar a la función de actualización.
    this.actualizarEmpresa();
  }
  
  actualizarEmpresa() {
    this._empresasService.updateEmpresa(this.empresas.idEmpresa, this.empresas, this.token).subscribe(
      response => {
        console.log('response', response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#0062cc',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Empresa actualizada correctamente.'
        });
      },
      error => {
        console.error('Error al actualizar la empresa:', error);
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Error al actualizar la empresa.'
        });
      }
    );
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
