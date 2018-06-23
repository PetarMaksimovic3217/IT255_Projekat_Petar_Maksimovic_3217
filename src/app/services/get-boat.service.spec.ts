import { TestBed, inject } from '@angular/core/testing';

import { GetBoatService } from './get-boat.service';

describe('GetBoatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBoatService]
    });
  });

  it('should be created', inject([GetBoatService], (service: GetBoatService) => {
    expect(service).toBeTruthy();
  }));
});
