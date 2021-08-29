import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisAgregarComponent } from './pais-agregar.component';

describe('PaisAgregarComponent', () => {
  let component: PaisAgregarComponent;
  let fixture: ComponentFixture<PaisAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaisAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
