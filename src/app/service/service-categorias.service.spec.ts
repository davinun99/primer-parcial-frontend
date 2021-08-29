import { TestBed } from '@angular/core/testing';

import { ServiceCategoriasService } from './service-categorias.service';

describe('ServiceCategoriasService', () => {
  let service: ServiceCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
