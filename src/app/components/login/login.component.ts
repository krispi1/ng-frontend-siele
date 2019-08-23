import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
    ) { }

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  })

  openNav() {
    document.getElementById("myNav").style.height = "100%";
  }

  closeNav() {
    document.getElementById("myNav").style.height = "0%";
    this.router.navigate(['/']);
  }

  onSubmit() {

    this.submitted = true;

    // Halt progress if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Successful submission
    if (this.loginForm.valid) {

      /* for debugging */
      // console.log(`Login form submitted successfully.
      // ${JSON.stringify(this.loginForm.value, null, 2)}`);

      // Login customer
      this.auth.loginCustomer(this.loginForm.value)
          .subscribe(
            res => {

              /* for debugging */
              //console.log(JSON.stringify(res));
              //console.log(JSON.stringify(res.accessToken));

              window.localStorage.setItem("accessToken", res.accessToken);
              this.closeNav();
            },
            error => console.log(error)
          )
    } // end if

  } // end onSubmit

  ngAfterViewInit() {
    this.openNav(); // open modal on page request
  }

} // end LoginComponent

/************************************************************/

/** Customer login url
 *
 * https://backendapi.turing.com/customers/login
 *
 **/

/** Example login
 *
 * curl -X POST "https://backendapi.turing.com/customers/login"
 * -H "accept: application/json"
 * -H "Content-Type: application/x-www-form-urlencoded"
 * -d "email=sielekrisp%40gmail.com&password=siele1"
 *
 **/

/** Example customer login response: success (200)
 *
  {
    "customer": {
      "customer_id": 58338,
      "name": "siele",
      "email": "sielekrisp@gmail.com",
      "address_1": null,
      "address_2": null,
      "city": null,
      "region": null,
      "postal_code": null,
      "shipping_region_id": 1,
      "credit_card": null,
      "day_phone": null,
      "eve_phone": null,
      "mob_phone": null
    },
    "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NTgzMzgsIm5hbWUiOiJzaWVsZSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2NTE2MTQ0NiwiZXhwIjoxNTY1MjQ3ODQ2fQ.UWwAM0eW-zBrS4QCrPyEwauRNl6b8r2SJiDTUlwalSs",
    "expires_in": "24h"
  }
 *
 **/

/** Example login response header
  *
    access-control-allow-origin: *
    connection: keep-alive
    content-length: 494
    content-type: application/json; charset=utf-8
    date: Wed, 07 Aug 2019 07:04:06 GMT
    etag: W/"1ee-MQf2OClZcQ8WgGX1W9KrYcUiGE8"
    server: nginx/1.10.3 (Ubuntu)
    x-powered-by: Express
  *
  **/

/** Example customer login failure: error (400)
 *
  {
    "code": "USR_02",
    "message": "The field example is empty.",
    "field": "example",
    "status": "500"
  }
 *
 **/
