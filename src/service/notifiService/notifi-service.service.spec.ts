import { TestBed } from '@angular/core/testing';

import { NotifiServiceService } from './notifi-service.service';

describe('NotifiServiceService', () => {
  let service: NotifiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
