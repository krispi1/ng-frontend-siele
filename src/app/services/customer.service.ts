import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  getCustomerUrl: string = "https://backendapi.turing.com/customer";
  updateCustomerUrl: string = "https://backendapi.turing.com/customer";
  updateCustomerAddressUrl: string = "https://backendapi.turing.com/customers/address";
  updateCreditCardUrl: string = "https://backendapi.turing.com/customers/creditCard"

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private accessToken = this.authService.getToken();

  // GET: get customer by ID -- uses token
  // "https://backendapi.turing.com/customer"
  // No parameter
  // Returns a customer object, or an error object
  getCustomer(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      "USER-KEY": this.accessToken
    });

    return this.http.get<any>(this.getCustomerUrl, { headers });

    /* curl -X GET "https://backendapi.turing.com/customer"
    -H "accept: application/json"
    -H "USER-KEY: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NTgzMzgsIm5hbWUiOiJzaWVsZSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2NzE0NDc0OSwiZXhwIjoxNTY3MjMxMTQ5fQ.9ms1Mf1kHBSwpdXE46vSiSVqjQIlH-b95UQiCPEekV0" */

  }

  // PUT: update a customer
  // "https://backendapi.turing.com/customer"
  // name*: string, email*: string, password: string,
  // day_phone: string, eve_phone: string, mob_phone: string
  // Parameter: customerObject with the above details
  // Returns a customer object, or an error object
    updateCustomer(customerObject): Observable<any> {
      return this.http.put<any>(this.updateCustomerUrl, customerObject);
    } // end updateCustomer()


  // PUT: update address from customer
  // "https://backendapi.turing.com/customers/address"
  // address_1*: string, address_2: string, city*: string,
  // region*: string, postal_code*: string,
  // country*: string, shipping_region_id*: number
  // Parameter: customerAddressObject with the above details
  // Returns a customer object, or an error object
  updateCustomerAddress(customerAddressObject): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        "USER-KEY": this.accessToken
      })
    }

    return this.http.put<any>(this.updateCustomerAddressUrl, customerAddressObject, httpOptions);

    /**AUTHORIZATION
     *
      curl -X PUT "https://backendapi.turing.com/customers/address"
      -H "accept: application/json"
      -H "USER-KEY: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NTgzMzgsIm5hbWUiOiJzaWVsZSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2NzE0NDc0OSwiZXhwIjoxNTY3MjMxMTQ5fQ.9ms1Mf1kHBSwpdXE46vSiSVqjQIlH-b95UQiCPEekV0"
      -H "Content-Type: application/x-www-form-urlencoded"
      -d "address_1=102&address_2=324&city=Nairobi&region=East%20Africa&postal_code=02000&country=Kenya&shipping_region_id=4"
    */

  } // end updateCustomerAddress()

  // PUT: update customer's credit card
  // "https://backendapi.turing.com/customers/creditCard"
  // Parameter: cardNumber: string
  // Returns a customer object, or an error object
  updateCreditCard(cardNumber: string): Observable<any> {
    return this.http.put<any>(this.updateCreditCardUrl, cardNumber);
  }

} // end CustomerService

/**
 * EXAMPLE CUSTOMER OBJECT returned
 * {
    "customer_id": 1,
    "name": "Lannucci",
    "email": "lannucci@hotmail.com",
    "address_1": "QI 19",
    "address_2": "",
    "city": "",
    "region": "",
    "postal_code": "",
    "country": "",
    "shipping_region_id": 1,
    "day_phone": "+351323213511235",
    "eve_phone": "+452436143246123",
    "mob_phone": "+351323213511235",
    "credit_card": "XXXXXXXX5100"
  }
 *
 */
