import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

export interface CartId {
  cart_id: string
}

export interface CartTotal {
  "total_amount": number
}

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http: HttpClient) { }

  generateCartIdUrl: string = "https://backendapi.turing.com/shoppingcart/generateUniqueId";
  addToCartUrl: string = "https://backendapi.turing.com/shoppingcart/add";
  productsInCartUrl: string = "https://backendapi.turing.com/shoppingcart/";
  updateCartUrl: string = "https://backendapi.turing.com/shoppingcart/update/";
  moveToCartUrl: string = "https://backendapi.turing.com/shoppingcart/moveToCart/";
  cartTotalUrl: string = "https://backendapi.turing.com/shoppingcart/totalAmount/";
  emptyCartUrl: string = "https://backendapi.turing.com/shoppingcart/empty/";
  saveForLaterUrl: string = "https://backendapi.turing.com/shoppingcart/saveForLater/";
  getSavedForLaterUrl: string = "https://backendapi.turing.com/shoppingcart/getSaved/";
  deleteFromCartUrl: string = "https://backendapi.turing.com/shoppingcart/removeProduct/";

  /**EXAMPLES OF SERVER RESPONSES are near bottom of this file
   *
   * success 200: array of products in the cart
   * error some 400s or 500s: error object returned
   */

  /* generateCartId() */
  // GET: generate unique cart_id
  // "https://backendapi.turing.com/shoppingcart/generateUniqueId"
  // No parameter
  // Example success 200 -- { "cart_id": "1xh7q2ze08jzata2u7" }
  generateCartId(): Observable<CartId> {

    return this.http.get<CartId>(this.generateCartIdUrl);

  } // end generateCartId()

  /* addToCart(productObject) */
  // POST: add product to cart
  // "https://backendapi.turing.com/shoppingcart/add"
  /**productObject
    {
      cart_id*: string,
      product_id*: number,
      attributes*: string
    }
    **/
  // Parameter: productObject
  // Returns an array of products in the cart, or error object
  addToCart(productObject): Observable<Product[]> {

    return this.http.post<Product[]>(this.addToCartUrl, productObject);

  } // end addToCart()

  /* getProductsInCart(cart_id) */
  // GET: get list of products in shopping cart
  // "https://backendapi.turing.com/shoppingcart/{cart_id}"
  // Parameter: cart_id*: string
  // Returns an array of products in cart, or error object
  getProductsInCart(cart_id: string): Observable<Product[]> {

    // Use temporary url to avoid modifying original url
    let tempUrl = this.productsInCartUrl + cart_id;

    return this.http.get<Product[]>(tempUrl);

  } // end getProductsInCart()

    /* updateCartItem(item_id: number, quantity: number) */
    // PUT: update cart by item
    // "https://backendapi.turing.com/shoppingcart/update/{item_id}"
    // Parameters: item_id*: number, quantity*: number
    // Returns an array of products in the cart.
    updateCartItem(item_id: number, quantity: number): Observable<Product[]> {

      let itemDetails = {
        item_id: item_id,
        quantity: quantity
      }
      let tempUrl = this.updateCartUrl + item_id;

      return this.http.put<Product[]>(tempUrl, itemDetails);

    } // end updateCartItem()

    /* deleteAllCartItems(cart_id: number) */
    // DELETE: (delete everything in the cart)
    // "https://backendapi.turing.com/shoppingcart/empty/{cart_id}"
    // Parameter: cart_id*: string
    // Returns an empty array, or an error object
    deleteAllCartItems(cart_id: string): Observable<any[]> {

      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
        body: {
          cart_id: cart_id
        }
      }
      let tempUrl = this.emptyCartUrl + cart_id;

      return this.http.delete<any[]>(tempUrl, options);

    } // end deleteAllCartItems()

    /* moveToCart(item_id: number) */
    // GET: move a product to cart
    // "https://backendapi.turing.com/shoppingcart/moveToCart/{item_id}"
    // Parameter: item_id*: number
    // Returns nothing on success, or an error object
    moveToCart(item_id: number): Observable<any> {

      let tempUrl = this.moveToCartUrl + item_id;

      return this.http.get<any>(tempUrl);

    } // end moveToCart()

    /* getCartTotal(cart_id: string) */
    // GET: fetch total amount from cart
    // "https://backendapi.turing.com/shoppingcart/totalAmount/{cart_id}"
    // Parameter: cart_id*: string
    // Returns something like {"total_amount": 5} or error object
    getCartTotal(cart_id: string): Observable<CartTotal> {

      // Use temporary url to avoid modifying original url
      let tempUrl = this.cartTotalUrl + cart_id;

      return this.http.get<CartTotal>(tempUrl);

    } // end getCartTotal()

    /* saveForLater(item_id: number) */
    // GET: save a product for later
    // "https://backendapi.turing.com/shoppingcart/saveForLater/{item_id}"
    // Parameter: item_id*: number
    // Returns nothing on succes, or an error object
    saveForLater(item_id: number): Observable<any> {

      let tempUrl = this.saveForLaterUrl + item_id;

      return this.http.get<any>(tempUrl);

    } // end saveForLater()

    /* getItemsSavedForLater(cart_id: string) */
    // GET: get products saved for later
    // "https://backendapi.turing.com/shoppingcart/getSaved/{cart_id}"
    // Parameter: cart_id*: string
    // Returns an array of product objects, or an error object
    getItemsSavedForLater(cart_id: string): Observable<Product[]> {

      let tempUrl = this.getSavedForLaterUrl + cart_id;

      return this.http.get<Product[]>(tempUrl);

    } // end getItemsSavedForLater()

    /* deleteProductFromCart(item_id: number) */
    // DELETE: remove a product in the cart
    // "https://backendapi.turing.com/shoppingcart/removeProduct/{item_id}"
    // Parameter: item_id*: number
    // Returns nothing, or an error object
    deleteProductFromCart(item_id: number): Observable<any> {

      let tempUrl = this.deleteFromCartUrl + item_id;

      return this.http.delete<any>(tempUrl);

    } // end deleteProductFromCart()

    /* getLocalStorageCartId() */
    // No parameter
    // Returns a string
    getLocalStorageCartId(): string {

      return localStorage.getItem('cart_id');

    }

} // end CartService

/**Example success 200 -- array of products in cart
    [
      {
        "item_id": 46141,
        "name": "Chartres Cathedral",
        "attributes": "blue",
        "product_id": 2,
        "image": "chartres-cathedral.gif",
        "price": "15.95",
        "quantity": 1,
        "subtotal": "15.95"
      }
    ]
   **/

/** Example Error 400 response
   *Error:
      { "code": "USR_02",
        "message": "The field example is empty.",
        "field": "example",
        "status": "500"
      }
  **/

/**
 * ***methods of CartService***
 *
 * generateCartId() -- done
 * addToCart(productObject) -- done
 * getProductsInCart(cart_id: string) -- done
 * updateCartItem(itemDetails) -- done
 * deleteAllCartItems(cart_id: number) -- done
 * moveToCart(item_id: number) -- not done
 * getCartTotal(cart_id: string) -- done
 * saveForLater(item_id: number) -- not done
 * getItemsSavedForLater(cart_id: string) -- not done
 * deleteProductFromCart(item_id: number) -- not done
 * getLocalStorageCartId() -- done
 *
 **/
