import { TestBed, inject } from '@angular/core/testing';

import { AdminServicesService } from './admin-services.service';

describe('AdminServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminServicesService]
    });
  });

  it('should be created', inject([AdminServicesService], (service: AdminServicesService) => {
    expect(service).toBeTruthy();
  }));
});
