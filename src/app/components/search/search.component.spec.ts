import { 
  TestBed, 
  async, ComponentFixture
} from '@angular/core/testing';

import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';

import { HttpClient} from '@angular/common/http';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SearchComponent ]
    }).compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

}); // end describe()