import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  public token:any = "";

  constructor(
    private _adminService:AdminService,
    private _router:Router,
    private _cookieService: CookieService,
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    console.log(this.token);
    
    if(!this.token){
      this._router.navigate(['/login']);
    }else{
      //mantener en el componente
    }
    
  }

}
