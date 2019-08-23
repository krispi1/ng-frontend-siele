import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  // These will store and pass around the data after retrieval
  private fetchedProducts: any[] = [];
  private localProducts: any[] = [];
  private products: any[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    // Fetch products on page load
    this.fetchProducts();
  }

  fetchProducts(){
    this.productsService
        .fetchAllProducts()
        .subscribe(response => {
          this.fetchedProducts = response.rows;
          
          // Invoke our "data manager"
          this.updateProducts();          
        });

  } // end fetchProducts()

  updateProducts() {
    
    // If productsHolder isn't yet initialized in localStorage,
    // set it & assign fetchedProducts to it; then 
    // retrieve the value just set and pass it to localProducts
    if (window.localStorage.getItem('productsHolder') === null) {
      
      // Save fetchedProducts in localStorage as productsHolder
      window.localStorage.setItem('productsHolder', JSON.stringify(this.fetchedProducts));
      this.localProducts = JSON.parse(window.localStorage.getItem('productsHolder'));
      
      console.log(`First clause: Initialize localStorage`); // for debugging

      // Relay the retrieved values to this.products for 
      // rendering in the view
      this.products = this.localProducts;
      
    } else
    
    // Fetch from localStorage if we have productsHolder set
    if (window.localStorage.getItem('productsHolder')) {
      this.localProducts = JSON.parse(window.localStorage.getItem('productsHolder'));
      this.products = this.localProducts;

      console.log(`Second clause: Retrieve from localStorage`); // for debugging 
    } else

    /** When the data in the server has changed
     * 
     * If what's in localStorage, i.e. productsHolder, and
     * fetchedProducts are dissimilar, overwrite the
     * productsHolder in localStorage
     * 
     **/
    if (window.localStorage.getItem('productsHolder').length != this.fetchedProducts.length) {
      window.localStorage.setItem('productsHolder', JSON.stringify(this.fetchedProducts));
      this.localProducts = JSON.parse(window.localStorage.getItem('productsHolder'));
      this.products = this.localProducts;

      console.log(`Third clause: Overwrite productsHolder in localStorage`); // for debugging
    }
    
  } // end updateProducts()

} // end ProductsComponent

/**
 ** ProductsService
 * The ProductsService has the various methods that handle
 * data retrieval operations.
 *
 ** fetchProducts() recieves an Observable from 
 * productsService.fetchAllProducts() so we need to subscribe 
 * to it to in order to consume the data from it.
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