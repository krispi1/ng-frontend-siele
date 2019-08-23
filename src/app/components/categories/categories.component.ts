import { Component, AfterViewInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements AfterViewInit {

  constructor(
    private categoryService: CategoriesService,
    ) { }

  categoryLinks: any[] = [];
  department_id: number;

  ngAfterViewInit() {

    this.allCategories();

  } // end ngAfterViewInit()

  allCategories(){
    this.categoryService
        .renderCategories()
        .subscribe(response => {
          this.categoryLinks = response.rows;
        });
  }

} // end CategoriesComponent

/** Categories in department url format
 *
 * https://backendapi.turing.com/categories/inDepartment/{department_id}
 *
 **/
