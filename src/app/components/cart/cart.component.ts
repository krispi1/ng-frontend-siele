import { Component, AfterViewInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements AfterViewInit {

  cartProducts: Product[] = [];
  cartTotal: number = 0.00;
  cart_id: string = this.cartService.getLocalStorageCartId();

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngAfterViewInit() {
    /* // Initialize cart_id
    if (this.cart_id === undefined) {
      this.cart_id = this.cartService.getLocalStorageCartId();
      console.log(`From assignment: ${this.cart_id}`);

    } else {
      this.cart_id = this.cart_id;
      console.log(`From else: ${this.cart_id}`);

    } */

    this.getItemsInCart();
    this.getCartTotal();

  } // end ngAfterViewInit()

  // Fetch items in a given cart
  getItemsInCart() {
    this.cartService.getProductsInCart(this.cart_id)
        .subscribe(response => {
          this.cartProducts = response;
          console.log(this.cartProducts);
        },
          error => console.log(error));

  } // end getItemsInCart()

  // Fetch total amount in a given cart
  getCartTotal() {
    //console.log(this.cart_id); // for debugging

    this.cartService.getCartTotal(this.cart_id)
        .subscribe(response => {
          this.cartTotal = response.total_amount;
        },
          error => console.log(error));

  } // end getCartTotal()

  // Update cart item in server
  updateItemInCart(itemId, quantity) {
    this.cartService.updateCartItem(itemId, quantity)
    .subscribe(response => {
      console.log(response)
    },
      error => console.log(error));

  } // end updateItemInCart()

  // Delete a single item from cart
  deleteItemFromCart(currentProduct) {
    this.cartService.deleteProductFromCart(currentProduct.item_id)
        .subscribe(
          response => console.log(`Item deleted: ${response}`),
          error => console.log(error)
        );

  } // end deleteItemFromCart()

  // Remove everything in the cart
  emptyCart() {
    this.cartService.deleteAllCartItems(this.cart_id)
        .subscribe(
          response => console.log(`Successful: ${response}`),
          error => console.log(error)
        );

  } // end emptyCart()

  // Reduce quantity of item in cart
  reduceQuantity(currentProduct) {
    let itemId = parseInt(currentProduct.item_id);
    let quantity = parseInt(currentProduct.quantity);

    quantity--;

    if (quantity <= 0 ) {
      this.deleteItemFromCart(currentProduct);
    }

    this.updateItemInCart(itemId, quantity);

  } // end reduceQuantity()

  // Increase quantity of item in cart
  increaseQuantity(currentProduct) {
    let itemId = parseInt(currentProduct.item_id);
    let quantity = parseInt(currentProduct.quantity);

    quantity++;

    this.updateItemInCart(itemId, quantity);

  } // end increaseQuantity()

  placeOrder() {

    // cart_id*: string, shipping_id*: number, tax_id*: number
    let orderObject = {
      cart_id: this.cart_id,
      shipping_id: 3,
      tax_id: 1

      // customerService.getCustomer()
    };

    this.orderService.createOrder(orderObject)
        .subscribe(
          response => response,
          error => console.log(error)
        );

  } // end placeOrder()

} // end CartService

/**
 ***methods of CartService***
 *
 * getItemsInCart()
 * getCartTotal()
 * updateItemInCart()
 * deleteItemFromCart(currentProduct)
 * emptyCart()
 * reduceQuantity(currentProduct)
 * increaseQuantity(currentProduct)
 * placeOrder()
 *
 **/
