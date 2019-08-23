import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductsInCategoryComponent } from './products-in-category.component';

describe('ProductsInCategoryComponent', () => {
  let component: ProductsInCategoryComponent;
  let fixture: ComponentFixture<ProductsInCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,  
        RouterTestingModule
      ],
      declarations: [ ProductsInCategoryComponent ]
    })
    .compileComponents();

 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

}); // end describe