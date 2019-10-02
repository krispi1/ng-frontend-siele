import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderId {
  order_id: number;
}

export interface Order {
  order_id: number;
  total_amount: number;
  created_on: string;
  shipped_on: string;
  status: string;
  name: string;
}

export interface OrderDetails {
  order_id: number;
  total_amount: number;
  created_on: string;
  shipped_on: string;
  status: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  createOrderUrl = 'https://backendapi.turing.com/orders';
  orderInfoUrl = 'https://backendapi.turing.com/orders/';
  customerOrdersUrl = 'https://backendapi.turing.com/orders/inCustomer';
  orderDetailsUrl = 'https://backendapi.turing.com/orders/shortDetail/';

  /* createOrder(orderObject) */
  // POST: create an order
  // "https://backendapi.turing.com/orders"
  // cart_id*: string, shipping_id*: number, tax_id*: number
  // Parameter: orderObject
  // Returns an Order ID object e.g. { "orderId": 1}
  // or an error object
  createOrder(orderObject): Observable<OrderId> {

    return this.http.post<OrderId>(this.createOrderUrl, orderObject);

  } // end createOrder()

  /* getOrderInfo(order_id: number) */
  // GET: get info about an order
  // "https://backendapi.turing.com/orders/{order_id}"
  // Parameter: order_id*: number
  // Returns an order object (see below), or an error object
  // tslint:disable-next-line: variable-name
  getOrderInfo(order_id: number): Observable<Order> {

    const tempUrl = this.orderInfoUrl + order_id;
    return this.http.get<Order>(tempUrl);

  } // end getOrderInfo()

  /* getCustomerOrders() */
  // GET: get orders by customer
  // "https://backendapi.turing.com/orders/inCustomer"
  // No parameter
  // Returns an array of Orders, or an error object
  getCustomerOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(this.customerOrdersUrl);

  } // end getCustomerOrders()

  /* getOrderDetails(order_id: number) */
  // GET: get order details
  // "https://backendapi.turing.com/orders/shortDetail/{order_id}"
  // Parameter: order_id*: number
  // Returns an order details object, or an error object
  /** Example success 200
    {
      "order_id": 1,
      "total_amount": 1,
      "created_on": "",
      "shipped_on": "",
      "status": "paid",
      "name": "Test"
    }
   **/
  // tslint:disable-next-line: variable-name
  getOrderDetails(order_id: number): Observable<OrderDetails> {

    const tempUrl = this.orderDetailsUrl + order_id;
    return this.http.get<OrderDetails>(tempUrl);

  } // end getOrderDetails()

} // end OrderService

// Example success 200 for getOrderInfo(order_id: number)
/**
 * {
    "order_id": 1,
    "product_id": 1,
    "attributes": "LG, Red",
    "product_name": "Arc d'Triomphe",
    "quantity": 1,
    "unit_cost": "14.99",
    "subtotal": "14.99"
  }
  **/

// Example error responses:
/** Error 400
   *Error:
      { "code": "USR_02",
        "message": "The field example is empty.",
        "field": "example",
        "status": "500"
      }
   **/

  /** Error 401
   *Error:
      {
        "code": "AUT_02",
        "message": "The apikey is invalid."
        "field": "API-KEY"
      }
   **/

/**
 ***Methods of OrderService**
 *
 * createOrder(orderObject) -- done, not applied
 * getOrderInfo(order_id: number) -- done, not applied
 * getCustomerOrders() -- done, not applied
 * getOrderDetails(order_id: number) -- done, not applied
 *
 */
