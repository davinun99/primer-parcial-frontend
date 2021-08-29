import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasAgregarComponent } from './categorias-agregar.component';

describe('CategoriasAgregarComponent', () => {
  let component: CategoriasAgregarComponent;
  let fixture: ComponentFixture<CategoriasAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
