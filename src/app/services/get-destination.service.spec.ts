import { TestBed, inject } from '@angular/core/testing';

import { GetDestinationService } from './get-destination.service';

describe('GetDestinationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDestinationService]
    });
  });

  it('should be created', inject([GetDestinationService], (service: GetDestinationService) => {
    expect(service).toBeTruthy();
  }));
});
