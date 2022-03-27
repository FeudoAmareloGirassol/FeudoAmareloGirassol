import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Categoria } from 'src/app/api/categoria';
import { ViewUserService } from 'src/app/services/view-user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categorias$!:   Observable<Categoria[]>;
  private searchTerms = new Subject<string>();

  constructor(private viewuserService: ViewUserService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void { this.categorias$ = this.searchTerms.pipe(

    debounceTime(300),

    distinctUntilChanged(),

    switchMap((term: string) => this.viewuserService.search(term)),
  );
}

}
