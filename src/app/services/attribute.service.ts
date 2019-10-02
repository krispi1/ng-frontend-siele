import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Attribute {
  attribute_id: number;
  name: string;
}

export interface AttributesInProduct {
  attribute_name: string;
  attribute_value_id: number;
  attribute_value: string;
}

@Injectable({
  providedIn: 'root'
})

export class AttributeService {

  attributesUrl: string = "https://backendapi.turing.com/attributes";
  attributesListUrl: string = "https://backendapi.turing.com/attributes/";
  attributeValuesUrl: string = "https://backendapi.turing.com/attributes/values/";
  attributesInProductUrl: string = "https://backendapi.turing.com/attributes/inProduct/";

  constructor(private http: HttpClient) { }

  /* getAttributes() */
  // GET: get a list of attributes
  // "https://backendapi.turing.com/attributes"
  // No parameter
  // Returns an array of attributes objects, or an error object
  // Examples below at the bottom of this file
  getAttributes(): Observable<any[]> {
    return this.http.get<any[]>(this.attributesUrl);
  }

  /* getAttributesList(attribute_id: number) */
  // GET: get an attributes list object
  // "https://backendapi.turing.com/attributes/"
  // Parameter attribute_id*: number
  // Returns an attributes list object, or an error object
  // Example success { "attribute_id": 1, "name": "Size" }
  getAttributesList(attribute_id: number): Observable<Attribute> {
    let tempUrl = this.attributesListUrl + attribute_id;

    return this.http.get<Attribute>(tempUrl);
  }

  /* getAttributeValues(attribute: number) */
  // GET: get all attributes' values
  // "https://backendapi.turing.com/attributes/values/{attribute_id}"
  // Parameter: attribute_id*: number
  // Returns an array of attribute values object, or an error object
  getAttributeValues(attribute_id: number): Observable<Attribute[]> {
    let tempUrl = this.attributeValuesUrl + attribute_id;

    return this.http.get<Attribute[]>(tempUrl);
  }

  /* getAttributesInProduct(product_id: number) */
  // GET: get attributes in a product
  // "https://backendapi.turing.com/attributes/inProduct/{product_id}"
  // Parameter: product_id*: number
  // Returns an array of attributes-in-product objects
  // or an error object
  getAttributesInProduct(product_id: number): Observable<AttributesInProduct[]> {
    let tempUrl = this.attributesInProductUrl + product_id;

    return this.http.get<AttributesInProduct[]>(tempUrl);
  }

} // end AttributeService

// Example responses
/**
 ** Success 200 for getAttributes()
 * [
      {
        "attribute_id": 1,
        "name": "Size"
      },
      {
        "attribute_id": 2,
        "name": "Color"
      }
    ]
 *
 ** Example success 200 for getAttributesInProduct(product_id: number)
    [
      {
        "attribute_name": "Color",
        "attribute_value_id": 6,
        "attribute_value": "White"
      },
      {
        "attribute_name": "Color",
        "attribute_value_id": 7,
        "attribute_value": "Black"
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
 **/
