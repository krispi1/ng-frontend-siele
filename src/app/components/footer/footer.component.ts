import { Component, OnInit } from '@angular/core';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  constructor(private departmentsService: DepartmentsService) { }

  departments: Department []= [];

  ngOnInit() {
    this.departmentsService.fetchDepartments()
        .subscribe(response => {
          this.departments = response;
        })
  }

} // end FooterComponent
