import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private registerUrl = "https://backendapi.turing.com/customers";
  private loginUrl = "https://backendapi.turing.com/customers/login";
  public cart_id: string = localStorage.getItem('cart_id');

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) { }

  // POST: Handle customer registration
  // The customer parameter shall hold the form data object
  // supplied by the calling code in the register component.
  registerCustomer(customer) {
    return this.http.post<any>(this.registerUrl, customer);
  }

  // POST: Handle customer login
  // Parameter: credentials shall hold the form data object
  // supplied by the calling code in the login component.
  loginCustomer(credentials) {
    let token = this.http.post<any>(this.loginUrl, credentials);
    if (token) {
      this.genCartId();
    }
    
    return token;
  }

  // POST: Handle Facebook login
  // "https://backendapi.turing.com/customers/facebook"
  // Return an object with customer auth credentials
  // Parameter: access_token*: string
  loginWithFacebook(access_token: string) {

  }

  // Log the customer out and redirect them to the homePage
  lougoutCustomer() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('cart_id');
    this.router.navigate(['/']);
  }

  // Return a boolean for whether a user is logged in or not
  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  // Retrieve accessToken from the localStorage
  getToken() {
    return localStorage.getItem('accessToken');
  }

  // Generate shopping cart_id upon login
  genCartId() {
   
    console.log(`Just b4 login..cart_id: ${this.cart_id}`); // for debugging
    
    this.cartService
      .generateCartId()
      .subscribe(response => {
        this.cart_id = response.cart_id;
        localStorage.setItem('cart_id', this.cart_id);
        console.log(`Upon login..cart_id: ${this.cart_id}`); // for debugging
      });
    console.log(`To return..cart_id: ${this.cart_id}`); // for debugging
   
  } // end genCartId()

} // end AuthService

/** Customer registration url
 *
 * https://backendapi.turing.com/customers
 *
 **/