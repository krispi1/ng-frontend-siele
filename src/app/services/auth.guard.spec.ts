import { 
  async, ComponentFixture, 
  TestBed, inject
} from '@angular/core/testing';

import { 
  HttpClientTestingModule,
  HttpTestingController
 } from '@angular/common/http/testing';

import { AuthGuard } from './auth.guard';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

}); // end describe 