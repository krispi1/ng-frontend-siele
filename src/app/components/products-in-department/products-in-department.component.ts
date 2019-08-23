import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsInDepartmentService } from '../../services/products-in-department.service';

@Component({
  selector: 'app-products-in-department',
  templateUrl: './products-in-department.component.html',
  styleUrls: ['./products-in-department.component.css']
})

export class ProductsInDepartmentComponent implements OnInit {

  private fetchedProducts: any[] = [];
  private localProducts: any[] = [];
  private productsInDepartment: any[];
  private productsInDepartmentUrl = "https://backendapi.turing.com/products/indepartment/";
  private department_id: number;
  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsInDepartmentService: ProductsInDepartmentService,
    ) { }
  
  ngOnInit() {
    // Retrieve id parameter from the current url
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.department_id = id; // assign the new id to the class property    

    // Reconstruct the url
    this.productsInDepartmentUrl += this.department_id;
    
    this.grabProductsInGivenDepartment();

  } // end ngOnInit()

  grabProductsInGivenDepartment(){
    // Invoke the fetchProductsInDepartment method of ProductsInDepartmentService
    // class passing in the reconstructed url to fetch corresponding data
    this.productsInDepartmentService
        .fetchProductsInDepartment(this.productsInDepartmentUrl)
        .subscribe(response => {
          this.fetchedProducts = response.rows;

          // Invoke our "data manager"
          this.updateProducts();
        });

  } // end grabProductsInGivenDepartment()

  updateProducts() {
    
    // If `productsInDept${this.department_id}Holder` isn't yet initialized in localStorage,
    // set it & assign fetchedProducts to it; then 
    // retrieve the value just set and pass it to localProducts
    if (window.localStorage.getItem(`productsInDept${this.department_id}Holder`) === null) {
      
      // Save fetchedProducts in localStorage as `productsInDept${this.department_id}Holder`      
      window.localStorage.setItem(`productsInDept${this.department_id}Holder`, JSON.stringify(this.fetchedProducts));
      this.localProducts = JSON.parse(window.localStorage.getItem(`productsInDept${this.department_id}Holder`));
      
      console.log(`First clause: Initialize localStorage`); // for debugging
      
      // Relay the retrieved values to this.productsInDepartment for rendering in the view
      this.productsInDepartment = this.localProducts;
      //console.log(`localProducts: ${this.localProducts}`); // for debugging
    } else
    
    // Fetch from localStorage if we have `productsInDept${this.department_id}Holder`set
    if (window.localStorage.getItem(`productsInDept${this.department_id}Holder`)) {
      this.localProducts = JSON.parse(window.localStorage.getItem(`productsInDept${this.department_id}Holder`));
      this.productsInDepartment = this.localProducts;
      
      console.log(`Second clause: Retrieve from localStorage`); // for debugging
    } else
  
    /** When the data in the server has changed
     * 
     * If what's in localStorage, i.e.`productsInDept${this.department_id}Holder` and
     * fetchedProducts are dissimilar, overwrite the
     * `productsInDept${this.department_id}Holder`in localStorage
     * 
     **/
    if (window.localStorage.getItem(`productsInDept${this.department_id}Holder`).length != this.fetchedProducts.length) {
      window.localStorage.setItem(`productsInDept${this.department_id}Holder`, JSON.stringify(this.fetchedProducts));
      this.localProducts = JSON.parse(window.localStorage.getItem(`productsInDept${this.department_id}Holder`));
      this.productsInDepartment = this.localProducts;
      
      // for debugging
      console.log(`Third clause: Overwrite productsInDept${this.department_id}Holder in localStorage`);  
    }
    
  } // end updateProducts()

} // end ProductsInDepartmentComponent

/**
** ProductsInDepartmentService
* The ProductsInDepartmentService handles data retrieval.
* 
** grabProductsInGivenDepartment() recieves an Observable from 
* productsInDepartmentService.fetchProductsInDepartment() so we 
* subscribe to it to in order to consume the data from it.
* 
** updateProducts() is sort of the store keeper that
* manages all the data-holding private properties. It
* ensures that what's relayed to the view is as up to date as
* possible. It also cuts down on data retrieval latency
* by making use of the window.localStorage.
*
** window.localStorage >> local key-value pair store
* 
* store data: declare key and set its value to given value
* window.localStorage.setItem('key', JSON.stringify(value))
* 
* retrieve data: return value of given key
* JSON.parse(window.localStorage.getItem('key'))
* 
* delete data: remove key and value of given key
* window.localStorage.deleteItem('key')
* 
* retrieve key: return name of key at given index
* window.localStorage.key(zeroIndexedInteger)
* 
* get length: return number of items within a given key
* window.localStorage.getItem('key').length
* 
* delete everything: clear up localStorage for current domain
* window.localStorage.clear()
*
**/