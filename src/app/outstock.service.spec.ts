import { TestBed } from '@angular/core/testing';

import { OutstockService } from './outstock.service';

describe('OutstockService', () => {
  let service: OutstockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutstockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
