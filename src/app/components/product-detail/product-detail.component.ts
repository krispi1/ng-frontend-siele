import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AttributeService, AttributesInProduct } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit, AfterContentInit {

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private customerService: CustomerService,
    private attributeService: AttributeService
    ) { }

  thisProduct;
  productId: number;
  productColors: AttributesInProduct[] = [];
  productSizes: AttributesInProduct[] = [];

  ngOnInit() {

    // retrieve id parameter from the current url
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productId = id; // assign the new id to the class property

    this.openModal(); // open modal on page request
    this.getProductDetails(this.productId);
    this.getCustomer();
    this.getProductAttributes();

  } // end ngOnInit()

  openModal() {

    document.getElementById("myModal").style.height = "100%";

  } // end openModal()

  closeModal() {

    document.getElementById("myModal").style.height = "0%";
    this.router.navigate(['/']);

  } // end closeModal()

  getProductDetails(productId) {

    const productDetailsUrl = `https://backendapi.turing.com/products/${productId}/details`;
    this.http.get(productDetailsUrl)
        .subscribe(response => {
          this.thisProduct = response;

          // for debugging
          //console.log(this.thisProduct);
          //console.log(this.activatedRoute.snapshot); // for debugging
        })

  } // end getProductDetails()

  addProduct2Cart() {
    const cartid = localStorage.getItem('cart_id');
    //console.log(cartid); // for debugging

    const productObject =
      {
        "cart_id": cartid,
        "product_id": this.productId,
        "attributes": "green, LG"
      }

    this.cartService.addToCart(productObject)
        .subscribe(
          product => console.log(product),
          error => console.log(error)
        );

  } // end addProduct2Cart()

  getCustomer() {
    this.customerService.getCustomer()
        .subscribe(
          response => {
            //console.log(response); // For debugging
            return response;
          },
          error => console.log(error)
        )
  } // end getCustomer()

  getProductAttributes() {
  this.attributeService
      .getAttributesInProduct(this.productId)
      .subscribe(response => {
        response.map(
          item => {
            if (item.attribute_name === 'Color') {
              this.productColors.push(item);
            }

            if (item.attribute_name === 'Size') {
              this.productSizes.push(item);
            }
          }
        )
      },
      error => console.log(error));

  } // end getProductAttributes()

  // Generate colors in the view
  generateColors() {
    const colorDiv = document.getElementById("color_div");

    console.log(colorDiv);

    this.productColors
        .map(
          color => {
            const button = document.createElement('button');
            button.name = color.attribute_name;
            button.style.backgroundColor = color.attribute_name;
            button.innerHTML = color.attribute_name;
            colorDiv.appendChild(button);

            // Add event handler
            button.addEventListener ("click", function() {
              alert("did something");
            });
          }
        )

  } // end generateColors()

  // Generate sizes in the view
  generateSizes() {

    window.onload = () => {
      const sizeDiv = document.getElementById("size_div");
      console.log(sizeDiv);
    }

  } // end generateSizes()

  ngAfterContentInit() {
    this.generateColors();
    this.generateSizes();
  }

} // end ProductDetailComponent

/** product details url format:
 *
 * https://backendapi.turing.com/products/{product_id}/details
 *
 **/

 /** sample result
  *
  * [
        {
        "product_id": 4,
        "name": "Gallic Cock",
        "description": "This fancy chicken is perhaps the most beloved of all French symbols. Unfortunately, there are only a few hundred left, so you'd better get your T-shirt now!",
        "price": "18.99",
        "discounted_price": "16.99",
        "image": "gallic-cock.gif",
        "image_2": "gallic-cock-2.gif"
      }
    ]
  *
  **/

/*********************************************************/

/** https://backendapi.turing.com/products/4
 *
  {
    "product_id": 4,
    "name": "Gallic Cock",
    "description": "This fancy chicken is perhaps the most beloved of all French symbols. Unfortunately, there are only a few hundred left, so you'd better get your T-shirt now!",
    "price": "18.99",
    "discounted_price": "16.99",
    "image": "gallic-cock.gif",
    "image_2": "gallic-cock-2.gif",
    "thumbnail": "gallic-cock-thumbnail.gif",
    "display": 2
  }
  *
  **/

  /** Problems
   *
   * getCustomer() returns 401
   *
   */
