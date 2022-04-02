import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { CompanyModel } from 'src/app/api/company';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {
  cards$!:   Observable<CompanyModel[]>;
  private searchTerms = new Subject<string>();

  constructor(private cardService: SearchService) { }
  
  ngOnInit(): void {
    this.cards$ = this.searchTerms.pipe(debounceTime(300),
    distinctUntilChanged(),
    switchMap((term: string) => this.cardService.search(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}