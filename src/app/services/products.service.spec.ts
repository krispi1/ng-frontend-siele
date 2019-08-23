import { TestBed, inject } from '@angular/core/testing';

import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { 
  HttpClient, 
  /* HttpErrorResponse */
} from '@angular/common/http';

import { ProductsService } from './Products.service';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created: ProductsService', 
      inject([ProductsService],
      (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

}); // end describe()