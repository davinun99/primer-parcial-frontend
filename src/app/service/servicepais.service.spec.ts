import { TestBed } from '@angular/core/testing';

import { ServicepaisService } from './servicepais.service';

describe('ServicepaisService', () => {
  let service: ServicepaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
