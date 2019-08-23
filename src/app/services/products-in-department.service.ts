import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchResults } from '../interfaces/fetchresults';

@Injectable({
  providedIn: 'root'
})

export class ProductsInDepartmentService {

  constructor(private http: HttpClient) { }

  fetchProductsInDepartment(productsUrl): Observable<FetchResults> {
    return this.http.get<FetchResults>(productsUrl);
  }

} // end ProductsInDepartmentService

/**
 * The FetchResults interface is the model used to enforce
 * type-checking of the Observable results returned by the
 * fetchProductsInDepartment method
 *
 */
