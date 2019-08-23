import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AttributeService } from './attribute.service';

describe('AttributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: AttributeService = TestBed.get(AttributeService);
    expect(service).toBeTruthy();
  });
});
