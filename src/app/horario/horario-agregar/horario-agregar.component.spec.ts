import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAgregarComponent } from './horario-agregar.component';

describe('HorarioAgregarComponent', () => {
  let component: HorarioAgregarComponent;
  let fixture: ComponentFixture<HorarioAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
