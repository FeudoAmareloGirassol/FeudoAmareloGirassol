import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Categoria } from 'src/app/api/categoria';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categorias$!: Observable<Categoria[]>;
  private searchTerms = new Subject<string>();

  constructor() { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
  }

}
