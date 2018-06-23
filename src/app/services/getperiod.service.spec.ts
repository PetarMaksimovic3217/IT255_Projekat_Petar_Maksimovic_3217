import { TestBed, inject } from '@angular/core/testing';

import { GetperiodService } from './getperiod.service';

describe('GetperiodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetperiodService]
    });
  });

  it('should be created', inject([GetperiodService], (service: GetperiodService) => {
    expect(service).toBeTruthy();
  }));
});
