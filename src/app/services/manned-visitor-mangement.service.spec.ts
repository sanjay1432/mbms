import { TestBed, inject } from '@angular/core/testing';

import { MannedVisitorMangementService } from './manned-visitor-mangement.service';

describe('MannedVisitorMangementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MannedVisitorMangementService]
    });
  });

  it('should be created', inject([MannedVisitorMangementService], (service: MannedVisitorMangementService) => {
    expect(service).toBeTruthy();
  }));
});
