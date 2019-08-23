import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { 
  HttpClient,
} from '@angular/common/http';

import { DepartmentsService } from './departments.service';

describe('DepartmentsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // One way of doing it
  /* it('should be created: DepartmentsService', 
      inject([DepartmentsService],
      (service: DepartmentsService) => {
    expect(service).toBeTruthy();
  })); */

  // Another way of doing it
  it('should be created: DepartmentsService', 
    inject([DepartmentsService],
    (service: DepartmentsService) => {
    expect(service).toBeTruthy();
  }));

}); // end describe()