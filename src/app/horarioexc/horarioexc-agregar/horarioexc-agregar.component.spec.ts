import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioexcAgregarComponent } from './horarioexc-agregar.component';

describe('HorarioexcAgregarComponent', () => {
  let component: HorarioexcAgregarComponent;
  let fixture: ComponentFixture<HorarioexcAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioexcAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioexcAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
