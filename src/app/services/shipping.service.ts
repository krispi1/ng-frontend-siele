import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShippingRegion {
  shipping_region_id: number
  shipping_region: string,
}

export interface ShippingRegionDetails {
  shipping_id: number,
  shipping_type: string,
  shipping_cost: string,
  shipping_region_id: number
}

@Injectable({
  providedIn: 'root'
})

export class ShippingService {

  shippingRegionsUrl: string = "https://backendapi.turing.com/shipping/regions";
  shippingRegionDetailsUrl: string = "https://backendapi.turing.com/shipping/regions/";
  
  constructor(private http: HttpClient) { }

  /* getShippingRegions() */
  // GET: get the shipping regions
  // No parameter
  // Returns array of shipping region objects, or an error object
  // Example responses at bottom of this file
  getShippingRegions(): Observable<ShippingRegion[]> {
    return this.http.get<ShippingRegion[]>(this.shippingRegionsUrl);
  }
      

  getShippingRegionDetails(shipping_region_id: number): Observable<ShippingRegionDetails> {
    let tempUrl = this.shippingRegionDetailsUrl + shipping_region_id;

    return this.http.get<ShippingRegionDetails>(tempUrl);
  }

} // end ShippingService

/**
 ** Example success 200 for getShippingRegions()
 * [
      {
        "shipping_region_id": 1,
        "shipping_region": "Please Select"
      },
      {
        "shipping_region_id": 2,
        "shipping_region": "US / Canada"
      },
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

 /**
  ** Example success for getShippingRegionDetails(shipping_region_id: number) 
  * [
      {
        "shipping_id": 1,
        "shipping_type": "Next Day Delivery ($20)",
        "shipping_cost": "20.00",
        "shipping_region_id": 2
      },
      {
        "shipping_id": 2,
        "shipping_type": "3-4 Days ($10)",
        "shipping_cost": "10.00",
        "shipping_region_id": 2
      },
      {
        "shipping_id": 3,
        "shipping_type": "7 Days ($5)",
        "shipping_cost": "5.00",
        "shipping_region_id": 2
      }
    ]
  **/