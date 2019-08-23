import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FetchResults } from '../../interfaces/fetchresults';

@Component({
  selector: 'app-products-in-category',
  templateUrl: './products-in-category.component.html',
  styleUrls: ['./products-in-category.component.css']
})

export class ProductsInCategoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    ) { }

  produtctsInCategoryUrl = "https://backendapi.turing.com/products/inCategory/";
  category_id;
  productsInCategory: FetchResults[] = [];

  ngOnInit() {
    // retrieve id parameter from the current url
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.category_id = id; // assign the new id to the class property
    console.log(`this.category_id: ${this.category_id = id}`);

    //reconstruct the url
    this.produtctsInCategoryUrl += this.category_id;
    console.log(`this.produtctsInCategoryUrl: ${this.produtctsInCategoryUrl}`);

    this.grabProductsInGivenCategory();

  } // end ngOnInit

  grabProductsInGivenCategory(){
    // invoke the fetchProductsInCategorySVC method of ProductsInCategoryService
    // class passing in the reconstructed url to fetch corresponding data
    this.productsService
        .fetchProductsInCategory(this.produtctsInCategoryUrl)
        .subscribe(response => {
          console.log(response);
          this.productsInCategory = response.rows;
          console.log(`this.productsInCategory: ${this.productsInCategory.length}`);
        });

  } // end grabProductsInGivenCategory()

} // end ProductsInCategoryComponent

/** Categories in department url format:
 *
 *"https://backendapi.turing.com/products/inCategory/category_id"
 *
 **/
