import { TestBed, inject } from '@angular/core/testing';
import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductsInDepartmentService } from './products-in-department.service';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // Tests start here
  // One way of doing it
  it('should be created: ProductsInDepartmentService', 
      inject([ProductsInDepartmentService], 
      (service: ProductsInDepartmentService) => {
    expect(service).toBeTruthy();
  }));

  // Another way of doing it
  /* it('should be created', () => {
    const service: ProductsInDepartmentService = TestBed.get(ProductsInDepartmentService);
    expect(service).toBeTruthy();
  }); */

}); // end describe()