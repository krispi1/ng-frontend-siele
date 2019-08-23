import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created: CategoriesService',
      inject([CategoriesService],
      (service: CategoriesService) => {
    expect(service).toBeTruthy();
  }));

}); // end describe()
