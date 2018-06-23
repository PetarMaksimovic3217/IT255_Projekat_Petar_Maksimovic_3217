import { TestBed, inject } from '@angular/core/testing';

import { GetManufacturerService } from './get-manufacturer.service';

describe('GetManufacturerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetManufacturerService]
    });
  });

  it('should be created', inject([GetManufacturerService], (service: GetManufacturerService) => {
    expect(service).toBeTruthy();
  }));
});
