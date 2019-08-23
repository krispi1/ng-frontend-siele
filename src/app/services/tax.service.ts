import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Tax {
  tax_id: number,
  tax_type: string,
  tax_percentage: string
}

@Injectable({
  providedIn: 'root'
})

export class TaxService {

  allTaxesUrl: string = "https://backendapi.turing.com/tax";
  taxByIdUrl: string = "https://backendapi.turing.com/tax/";
  
  constructor(private http: HttpClient) { }

  /* getAllTaxes() */
  // GET: gets all tax types
  // "https://backendapi.turing.com/tax"
  // No parameter
  // Returns an array of tax types, or an error object
  getAllTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(this.allTaxesUrl);
  }

  /* getTaxById(tax_id: number) */
  // GET: gets tax details
  // "https://backendapi.turing.com/tax/{tax_id}"
  // Parameter: tax_id*: number
  // Returns a tax object, or an error object
  getTaxById(tax_id: number): Observable<Tax> {
    let tempUrl = this.taxByIdUrl + tax_id;

    return this.http.get<Tax>(tempUrl);
  }

} // end TaxService

/** Example Responses 
 * 
 * Success 200 for getAllTaxes()
 * [
    {
      "tax_id": 1,
      "tax_type": "Sales Tax at 8.5%",
      "tax_percentage": "8.50"
    }
  ]
 * 
 ** Error 400 
 * {
      "code": "USR_02",
      "message": "The field example is empty.",
      "field": "example",
      "status": "500"
    }
   * 
 */