import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShippingService } from './shipping.service';

describe('ShippingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: ShippingService = TestBed.get(ShippingService);
    expect(service).toBeTruthy();
  });
});
