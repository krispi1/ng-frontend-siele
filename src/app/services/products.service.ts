import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchResults } from '../interfaces/fetchresults';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  private productsUrl: string = 'https://backendapi.turing.com/products';

  /* fetchAllProducts() */
  // Returns an observable stream of data.
  // The calling code has to subscribe to the observable in
  // order to retrieve the data.
  fetchAllProducts(): Observable<FetchResults> {

    return this.http.get<FetchResults>(this.productsUrl);

  } // fetchAllProducts()

  fetchProductsInCategory(categoriesUrl): Observable<FetchResults> {

    return this.http.get<FetchResults>(categoriesUrl);

  } // end fetchProductsInCategory()

} // end ProductsService

/**
 * The FetchResults interface is the model used to enforce
 * type-checking of the Observable results returned by the
 * fetchProductsInCategory_svc method
 *
 */
