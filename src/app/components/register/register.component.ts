import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements AfterViewInit {

  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  registerForm: FormGroup = this.formBuilder.group(
    {
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }
  );
  
  openModal() {
    document.getElementById("myModal").style.height = "100%";
  }  
  
  closeModal() {
    document.getElementById("myModal").style.height = "0%";
    this.router.navigate(['/']);
  }

  onSubmit() {
    
    this.submitted = true;

    // halt progress if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // successful submission
    if (this.registerForm.valid) {
      // console.log(`Form submitted successfully.
      // ${JSON.stringify(this.registerForm.value, null, 2)}`);

      // register customer with the backend
      this.auth.registerCustomer(this.registerForm.value)
          .subscribe(
            res => console.log(res),
            error => console.log(error)
          )
    }
  
  } // end onSubmit

  onReset() {
    this.registerForm.reset();
    this.submitted = false;
  }

  ngAfterViewInit() {
    this.openModal();
    console.log(this.registerForm);
    console.log(this.registerForm.status);
    console.log(this.registerForm.errors);
  }

} // end RegisterComponent

/************************************************************/

/** Customer registration url
 *
 * https://backendapi.turing.com/customers
 *  
 **/

/** Example customer registration
 *
 * curl -X POST "https://backendapi.turing.com/customers" 
 * -H "accept: application/json" 
 * -H "Content-Type: application/x-www-form-urlencoded" 
 * -d "name=Siele&email=siele%40email.com&password=siele1"
 *  
 **/

/** Example customer registration response: success (200) 
 * 
  {
    "customer": {
      "customer_id": 58326,
      "name": "Siele",
      "email": "siele@email.com",
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
    "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NTgzMjYsIm5hbWUiOiJTaWVsZSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2NTA3NDg3NCwiZXhwIjoxNTY1MTYxMjc0fQ.5lddsAhBjPyBXN0cOLB3E-OYUGdsiP4w-VhViG0PokM",
    "expires_in": "24h"
  }
 * 
 **/

/** Example registration response header  
  *
    access-control-allow-origin: * 
    connection: keep-alive 
    content-length: 489 
    content-type: application/json; charset=utf-8 
    date: Tue, 06 Aug 2019 07:01:14 GMT 
    etag: W/"1e9-+J73iAUGHpFyD8GR4gUjCeexC2c" 
    server: nginx/1.10.3 (Ubuntu) 
    x-powered-by: Express 
  *  
  **/

/** Example customer registration failure: error (400) 
 * 
  {
    "code": "USR_02",
    "message": "The field example is empty.",
    "field": "example",
    "status": "500"
  }
 * 
 **/