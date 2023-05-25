import { TestBed } from '@angular/core/testing';

import { ClientCurrentAccountService } from './client-current-account.service';

describe('ClientCurrentAccountService', () => {
  let service: ClientCurrentAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCurrentAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
