import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { 
  HttpClientTestingModule,
  HttpTestingController
 } from '@angular/common/http/testing';

import { ProductsComponent } from './products.component';
import { HttpClient } from 'selenium-webdriver/http';

describe('ProductsComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});