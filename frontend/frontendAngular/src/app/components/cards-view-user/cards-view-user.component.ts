import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CompanyModel } from 'src/app/api/company';
import { GetCompanyService } from 'src/app/services/get-companies.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-cards-view-user',
  templateUrl: './cards-view-user.component.html',
  styleUrls: ['./cards-view-user.component.scss']
})
export class CardsViewUserComponent implements OnInit {
  myControl = new FormControl();
  result = '';
  cards: CompanyModel[] = [];
  cards$!:   Observable<CompanyModel[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private getCompanyService: GetCompanyService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.getCards();
    this.cards$ = this.searchTerms.pipe(debounceTime(300),
    distinctUntilChanged(),
    switchMap((term: string) => this.searchService.search(term)),
    );
  }

  getCards(): void {
    this.getCompanyService.getCompanies()
      .subscribe(cards => this.cards = cards.slice());
  }
  updateCards(): void {
    this.searchService.search(this.result)
    .subscribe(cards => this.cards = cards.slice());
    console.log(this.result)
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
