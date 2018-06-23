import { TestBed, inject } from '@angular/core/testing';

import { GetModelService } from './get-model.service';

describe('GetModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetModelService]
    });
  });

  it('should be created', inject([GetModelService], (service: GetModelService) => {
    expect(service).toBeTruthy();
  }));
});
