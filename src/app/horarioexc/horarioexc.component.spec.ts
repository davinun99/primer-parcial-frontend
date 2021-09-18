import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioexcComponent } from './horarioexc.component';

describe('HorarioexcComponent', () => {
  let component: HorarioexcComponent;
  let fixture: ComponentFixture<HorarioexcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioexcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioexcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
