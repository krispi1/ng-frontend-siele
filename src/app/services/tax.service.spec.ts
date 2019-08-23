import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaxService } from './tax.service';

describe('TaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: TaxService = TestBed.get(TaxService);
    expect(service).toBeTruthy();
  });

}); // end describe()
