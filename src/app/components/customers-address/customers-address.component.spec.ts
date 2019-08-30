import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomersAddressComponent } from './customers-address.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomersAddressComponent', () => {
  let component: CustomersAddressComponent;
  let fixture: ComponentFixture<CustomersAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ CustomersAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

}); // end describe()
