import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';

declare var Chart: any;

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

    const ventasData = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [{
        label: "Ventas",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }]
    };
  
    const comprasData = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [{
        label: "Compras",
        data: [8, 12, 5, 10, 6, 8],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }]
    };
  
    // Configuración de los gráficos
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    // Crear los gráficos
    const ventasChart = new Chart(document.getElementById("ventasChart"), {
      type: "bar",
      data: ventasData,
      options: chartOptions
    });
  
    const comprasChart = new Chart(document.getElementById("comprasChart"), {
      type: "bar",
      data: comprasData,
      options: chartOptions
    });
    
  }

  

}

