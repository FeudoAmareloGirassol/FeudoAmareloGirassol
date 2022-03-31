import { Component, OnInit } from '@angular/core';
import { Card } from '../../api/card';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  cards$!:   Observable<Card[]>;
  private searchTerms = new Subject<string>();

  constructor(private cardService: CardService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void { this.cards$ = this.searchTerms.pipe(
    debounceTime(300),

    distinctUntilChanged(),

    switchMap((term: string) => this.cardService.search(term)),
  );

  }

}