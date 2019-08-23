import { Injectable } from '@angular/core';
import { Department } from '../interfaces/department';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DepartmentsService {

  constructor(private http: HttpClient) { }

  departmentsUrl: string = 'https://backendapi.turing.com/departments';

  fetchDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentsUrl);
  }

} // end DepartmentsService
