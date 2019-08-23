import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private messageSource = new BehaviorSubject<string>("");
  public currentMessage = this.messageSource.asObservable();

  constructor() { }

  updateSearchTerm(message: string) {
    this.messageSource.next(message);
  }

} // end SearchService