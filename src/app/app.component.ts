import { Component, OnInit, Output } from '@angular/core';
import { Department } from './interfaces/department';
import { DepartmentsService } from './services/departments.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private departmentsService: DepartmentsService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  departments: Department []= [];
  isLoggedIn: boolean = this.authService.loggedIn();
  cart_id = this.cartService.getLocalStorageCartId();
  name: string;
  cartTotal: number = 0;

  ngOnInit() {
    /* For debugging */
    setInterval(
      () => console.log(`Logged In? ${this.name} ${this.isLoggedIn =
        this.authService.loggedIn()}`), 1000
    );

    this.departmentsService.fetchDepartments()
        .subscribe(response => {
          this.departments = response;
        })

    this.getCartTotal();

  } // end ngOnInit()

  logUserOut() {
    this.authService.lougoutCustomer();
  }

   // Fetch cart total of given cart
  getCartTotal() {
    console.log(this.cart_id);
    this.cartService.getCartTotal(this.cart_id)
        .subscribe(response => {
          this.cartTotal = response.total_amount;
          console.log(this.cartTotal);
        },
          error => console.log(error));

  } // end getCartTotal()

} // end AppComponent
