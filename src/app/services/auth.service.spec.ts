import { TestBed, inject } from '@angular/core/testing';

import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { 
  HttpClient, 
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule
       ],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created: AuthService', 
      inject([AuthService],
      (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

}); // end describe()