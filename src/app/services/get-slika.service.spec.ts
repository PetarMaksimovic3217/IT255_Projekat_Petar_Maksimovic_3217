import { TestBed, inject } from '@angular/core/testing';

import { GetSlikaService } from './get-slika.service';

describe('GetSlikaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSlikaService]
    });
  });

  it('should be created', inject([GetSlikaService], (service: GetSlikaService) => {
    expect(service).toBeTruthy();
  }));
});
