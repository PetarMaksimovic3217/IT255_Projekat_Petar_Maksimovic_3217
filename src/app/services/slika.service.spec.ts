import { TestBed, inject } from '@angular/core/testing';

import { SlikaService } from './slika.service';

describe('SlikaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlikaService]
    });
  });

  it('should be created', inject([SlikaService], (service: SlikaService) => {
    expect(service).toBeTruthy();
  }));
});
