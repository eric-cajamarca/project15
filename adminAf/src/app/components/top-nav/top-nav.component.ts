import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {


  
  constructor(
    private _router:Router
  ){

  }

  logout(){
    window.location.reload();
    localStorage.clear();
   
  }
  
}
