import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FetchResults } from '../interfaces/fetchresults';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})

// This (CategoriesService) service provider is made available
// to the entire application at the root level (AppModule)
// by passing it to the providers array of @NgModule therein.
export class CategoriesService {

  categoriesBaseUrl = 'https://backendapi.turing.com/categories';
  categoryByIdUrl = 'https://backendapi.turing.com/categories/';
  categoriesInProductUrl = 'https://backendapi.turing.com/categories/inProduct/';
  categoriesInDepartmentUrl = 'https://backendapi.turing.com/categories/inDepartment/';

  constructor(private http: HttpClient) { }

  renderCategories(): Observable<FetchResults> {
    return this.http.get<FetchResults>(this.categoriesBaseUrl);
  }

  getCategoryById(category_id: number): Observable<Category> {
    this.categoryByIdUrl += category_id;
    return this.http.get<Category>(this.categoryByIdUrl);
  }

  getCategoriesInProduct(product_id: number): Observable<any[]> {
    this.categoriesInProductUrl += product_id;
    return this.http.get<any[]>(this.categoriesInProductUrl);
  }

  getCategoriesInDepartment(department_id: number): Observable<Category[]> {
    this.categoriesInDepartmentUrl += department_id;
    return this.http.get<Category[]>(this.categoriesInDepartmentUrl);
  }

} // end CategoriesService

/**CategoriesService
 * All data retrieval services for categories are delegated to
 * this class.
 *
 ** FetchResults
 * This is an interface that defines the shape of the response
 * we receive from the server; it's basically an object
 * with two properties: count and rows.
 *
 ** renderCategories()
 * This method fetches all categories from the server & returns
 * an Observable of type FetchResults.
 *
 ** getCategoryById(category_id: number)
 * This method takes in a single parameter of type number,
 * appends it to a predefined url, performs a get request to
 * the re-constructed url and returns an Observable of type
 * Category.
 *
 ** getCategoriesInProduct(product_id: number)
 * This method takes in a single parameter of type number,
 * appends it to a predefined url, performs a get request to
 * the re-constructed url and returns an Observable array of
 * all the categories to which the given product falls into.
 *
 ** getCategoriesInDepartment(department_id: number)
 * This method takes in a single parameter of type number,
 * appends it to a predefined url, performs a get request to
 * the re-constructed url and returns an Observable array of
 * all the categories belonging to the given department.
 *
 * Each of the methods of CategoriesService returns an
 * Observable; therefore we need to subscribe to them
 * wherever invoked in order to consume their results.
 *
 **/
