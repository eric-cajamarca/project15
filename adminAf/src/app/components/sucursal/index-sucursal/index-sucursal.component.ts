import { Component } from '@angular/core';

@Component({
  selector: 'app-index-sucursal',
  templateUrl: './index-sucursal.component.html',
  styleUrls: ['./index-sucursal.component.css']
})
export class IndexSucursalComponent {
public sucursales: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }
}
