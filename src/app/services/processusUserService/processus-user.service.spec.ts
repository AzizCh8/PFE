import { TestBed } from '@angular/core/testing';

import { ProcessusUserService } from './processus-user.service';

describe('ProcessusUserService', () => {
  let service: ProcessusUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessusUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
