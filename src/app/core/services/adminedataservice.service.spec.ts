import { TestBed } from '@angular/core/testing';

import { AdminedataserviceService } from './adminedataservice.service';

describe('AdminedataserviceService', () => {
  let service: AdminedataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminedataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
