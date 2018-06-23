import { TestBed, inject } from '@angular/core/testing';

import { GetOneDestinationService } from './get-one-destination.service';

describe('GetOneDestinationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetOneDestinationService]
    });
  });

  it('should be created', inject([GetOneDestinationService], (service: GetOneDestinationService) => {
    expect(service).toBeTruthy();
  }));
});
