import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInDepartmentComponent } from './products-in-department.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsInDepartmentComponent', () => {
  let component: ProductsInDepartmentComponent;
  let fixture: ComponentFixture<ProductsInDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule
       ],
      declarations: [ ProductsInDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

}); // end describe()
