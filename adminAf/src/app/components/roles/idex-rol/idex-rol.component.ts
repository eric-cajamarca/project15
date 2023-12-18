import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-idex-rol',
  templateUrl: './idex-rol.component.html',
  styleUrls: ['./idex-rol.component.css']
})
export class IdexRolComponent {

  public token:any;
  public roles:any = [];
  
  public page = 1;
  public pageSize = 10;

  constructor(
   
    private _cookieService: CookieService,
    private _rolService: RolService,
    private _route: Router,
  ) {
    this.token = this._cookieService.get('token');
   }


  ngOnInit(): void {
    this._rolService.obtener_roles(this.token).subscribe(
      response=>{
        console.log('response: ',response.data);
        this.roles = response.data;
        console.log('this.roles: ',this.roles);
      },
      error=>{
        console.log('error: ',error);
      }
    )

  }

  redirigirCrearRol(){
    this._route.navigate(['/rol/create']);
  }
}
