import { TestBed } from '@angular/core/testing';

import { IsAliveService } from './is-alive.service';

describe('IsAliveService', () => {
  let service: IsAliveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAliveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
