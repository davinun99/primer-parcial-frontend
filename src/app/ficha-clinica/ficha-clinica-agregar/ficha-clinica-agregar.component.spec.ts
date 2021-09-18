import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaAgregarComponent } from './ficha-clinica-agregar.component';

describe('FichaClinicaAgregarComponent', () => {
  let component: FichaClinicaAgregarComponent;
  let fixture: ComponentFixture<FichaClinicaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaClinicaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaClinicaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
