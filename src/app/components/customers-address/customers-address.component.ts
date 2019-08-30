import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ShippingService } from 'src/app/services/shipping.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers-address',
  templateUrl: './customers-address.component.html',
  styleUrls: ['./customers-address.component.css']
})

export class CustomersAddressComponent implements OnInit, AfterViewInit {

  addressForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private shippingService: ShippingService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group(
      {
        address_1: ['', Validators.required],
        address_2: [''],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postal_code: ['', Validators.required],
        country: ['', Validators.required],
        shipping_region_id: ['', Validators.required],
      }
    );

  } // end ngOnInit()

  ngAfterViewInit() {
    // Initialize countries and shipping regions in view
    this.getCountries();
    this.initShippingRegions();
  }

  onSubmit() {
    let form = this.addressForm.value;
    //console.log(form); // For debugging

    this.customerService.updateCustomerAddress(form)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );

  } // end onSubmit()

  onReset() {
    this.addressForm.reset();
    this.submitted = false;
  }

  // Create select element and initialize countries
  getCountries() {
    let selectCountry = document.getElementById("selectCountry");

    // Retrieve countries from a file (countries.json)
    const countries =
          this.http.get<any[]>('../../assets/countries.json');

    // Prepare countries for the select element
    countries.subscribe(countries => {
      countries.map(country => {

        // Populate select dropdown with countries dynamically
        let option = document.createElement('option');
        option.value = country.name;
        option.textContent = country.name;
        selectCountry.appendChild(option);
      });
    })
  } // end getCountries()

  // Create select element and initialize shipping regions
  initShippingRegions() {
    let shippingRegion = document.getElementById("shipping_region");

    this.shippingService.getShippingRegions()
        .subscribe(
          shippingRegions => {
            shippingRegions.map(
              shippingRgn => {

                // Populate select dropdown dynamically
                let option = document.createElement('option');
                option.value = shippingRgn.shipping_region_id.toString();
                option.textContent = shippingRgn.shipping_region;
                shippingRegion.appendChild(option);
              }
            );
          },
          error => console.log(error)
        );

  } // end getShippingRegions()

} // end CustomersAddressComponent
