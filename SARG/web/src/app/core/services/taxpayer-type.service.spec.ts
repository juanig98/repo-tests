import { TestBed } from '@angular/core/testing';

import { TaxpayerTypeService } from './taxpayer-type.service';

describe('TaxpayerTypeService', () => {
  let service: TaxpayerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxpayerTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
