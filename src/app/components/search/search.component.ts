import { Component, OnInit } from '@angular/core';
import { FetchResults } from '../../interfaces/fetchresults';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private searchService: SearchService
  ) { }

  private searchUrl = 'https://backendapi.turing.com/products/search?query_string=';
  private searchResults: any[] = [];
  searchString: string;

  ngOnInit() {
    this.searchService.currentMessage
        .subscribe(message => this.searchString = message);
  }

  /***yet to grab message from service and search it***/

  searchService1(searchPath): Observable<FetchResults> {
    return this.http.get<FetchResults>(searchPath);
  }

  searchProducts(searchTerm: string) {
    // Re-construct the searchUrl
    this.searchUrl += searchTerm;
    this.searchService1(this.searchUrl)
        .subscribe(response => {
          this.searchResults = response.rows;
          console.log(this.searchResults);
        });
  }

} // end SearchComponent

/** Search url format:
 *
 * "https://backendapi.turing.com/products/search?query_string=searchTerm"
 *
 **/
