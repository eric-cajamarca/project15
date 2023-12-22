import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClientesComponent } from './index-clientes.component';

describe('IndexClientesComponent', () => {
  let component: IndexClientesComponent;
  let fixture: ComponentFixture<IndexClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
