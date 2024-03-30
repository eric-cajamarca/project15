import { Component } from '@angular/core';

@Component({
  selector: 'app-index-marca',
  templateUrl: './index-marca.component.html',
  styleUrls: ['./index-marca.component.css']
})
export class IndexMarcaComponent {
  public marcas: Array<any> = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
