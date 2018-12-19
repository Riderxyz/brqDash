import { TestBed } from '@angular/core/testing';

import { MobileServiceService } from './mobile-service.service';

describe('MobileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileServiceService = TestBed.get(MobileServiceService);
    expect(service).toBeTruthy();
  });
});
