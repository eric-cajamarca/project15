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
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public file : any = undefined ;
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
          console.log('this.direccionEmpresas', this.direccionEmpresas);


          //quiero buscar el nombre de la region de response.data[0].region en this.regiones y extraer el id y name
          // this.regiones.forEach((element: any) => {
          //   if (element.name == this.direccionEmpresas.region) {
          //     this.direccionEmpresas.region = element.id;
              
          //   }
          // });

          console.log('this.direccionEmpresas.region', this.direccionEmpresas);
          
        }
      )
    



    this.select_pais();
  }

  
  buscar() {}


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

  
  onLogoChange(event:any):void{
    var file:any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];

    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay un imagen de envio'
      });
    } 

    if(file.size <= 4000000){

       if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
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

      }else{
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
    }else{
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

  editarDireccion(id: any){
    //quiero obtener el id de del array this.direccionEmpresas seleccionado
    console.log('id', id);
    console.log('this.direccionEmpresas', this.direccionEmpresas);

    //quiero buscar el id de la direccion seleccionada en el array this.direccionEmpresas y extraer el objeto
    this.direccionEmpresas_const.forEach((element: any) => {
      if (element.idDireccionEmpresa == id) {
        console.log('element', element);
        this.direccionEmpresas = element;
        console.log('this.direccionEmpresas', this.direccionEmpresas);
      }else{
        console.log('No se encontró el id');
      }
    });

    


    

    


  }

  registrar(registroForm: any){

    console.log('this.cliientes', this.empresas);
    console.log('this.direccionEmpresas', this.direccionEmpresas);

    // if (registroForm.valid) {
      
      this.data = this.empresas;
      console.log('this.data', this.data);
      //convertir array this.clientes a un objeto para pasarlo a mi servicio
      //  this.data.forEach((element: { id: string | number; name: any; }) => {
      //   this.data[element.id] = element.id;
      //  });

      //  console.log('this.data como objeto', this.data);
      
        
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
