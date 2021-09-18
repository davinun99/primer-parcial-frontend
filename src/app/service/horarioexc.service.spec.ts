import { TestBed } from '@angular/core/testing';

import { HorarioexcService } from './horarioexc.service';

describe('HorarioexcService', () => {
  let service: HorarioexcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioexcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
