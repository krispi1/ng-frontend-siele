import { 
  TestBed, 
  async, ComponentFixture, 
} from '@angular/core/testing';

import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CategoriesComponent ]
    }).compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

}); // end describe()