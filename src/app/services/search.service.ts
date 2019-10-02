import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor() { }

  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();

  updateSearchTerm(message: string) {

    this.messageSource.next(message);

  } // end updateSearchTerm()

} // end SearchService

/**
 *
 ***Yet to implement**
 *
 */
