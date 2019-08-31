import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private registerUrl = "https://backendapi.turing.com/customers";
  private loginUrl = "https://backendapi.turing.com/customers/login";
  public cart_id: string = localStorage.getItem('cart_id');

  // POST: Handle customer registration
  // The customer parameter shall hold the form data object
  // supplied by the calling code in the register component.
  registerCustomer(customer) {

    return this.http.post<any>(this.registerUrl, customer);

  } // end registerCustomer()

  // POST: Handle customer login
  // Parameter: credentials shall hold the form data object
  // supplied by the calling code in the login component.
  loginCustomer(credentials) {

    return this.http.post<any>(this.loginUrl, credentials);

  } // end loginCustomer()

  // POST: Handle Facebook login
  // "https://backendapi.turing.com/customers/facebook"
  // Return an object with customer auth credentials
  // Parameter: access_token*: string
  loginWithFacebook(access_token: string) {

  }

  // Log the customer out and redirect them to the homePage
  lougoutCustomer() {

    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);

  } // end lougoutCustomer()

  // Return a boolean for whether a user is logged in or not
  loggedIn() {

    return !!localStorage.getItem('accessToken');

  } // end loggedIn()

  // Retrieve accessToken from the localStorage
  getToken() {

    return localStorage.getItem('accessToken');

  } // end getToken()

  // Generate shopping cart_id upon login
  /* genCartId() { // yet to remove this

    console.log(`Just b4 login..cart_id: ${this.cart_id}`); // for debugging

    this.cartService
      .generateCartId()
      .subscribe(response => {
        this.cart_id = response.cart_id;
        localStorage.setItem('cart_id', this.cart_id);
        console.log(`Upon login..cart_id: ${this.cart_id}`); // for debugging
      });
    console.log(`To return..cart_id: ${this.cart_id}`); // for debugging

  } */ // end genCartId()

} // end AuthService

/** Customer registration url
 *
 * https://backendapi.turing.com/customers
 *
 **/

/**
 ***Methods of AuthService**
 *
 * registerCustomer(customer) -- done
 * loginCustomer(credentials) -- done/partially
 * loginWithFacebook(access_token: string) -- not done
 * lougoutCustomer() -- done
 * loggedIn() -- done
 * getToken() -- done
 *
 */

 /**
  ***Yet to refactor AuthService**
  ** Yet to remove cartService
  *

  */
