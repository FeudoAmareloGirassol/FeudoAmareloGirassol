import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CompanyModel } from 'src/app/api/company';
import { CategoryFilterService } from 'src/app/services/category-filter.service';
import { GetCompanyService } from 'src/app/services/get-companies.service';
import { SearchService } from 'src/app/services/search.service';
import { CategoryModel } from '../../api/category';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  result = '';
  category = '';
  categories: CategoryModel[] = [
    {value: 'ADVOCACIA', viewValue: 'Advocacia'},
    {value: 'SAUDE', viewValue: 'Saúde'},
    {value: 'ASSISTENCIA_TECNICA', viewValue: 'Assistência Técnica'},
    {value: 'CONSTRUCAO_CIVIL', viewValue: 'Construção Civil'},
    {value: 'BELEZA', viewValue: 'Beleza'},
    {value: 'EDUCACAO', viewValue: 'Educação'},
    {value: 'SERVICOS_DOMESTICOS', viewValue: 'Serviços Domésticos'},
    {value: 'DESIGN', viewValue: 'Design'},
  ]
  cards: CompanyModel[] = [];
  cards$!:   Observable<CompanyModel[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private getCompanyService: GetCompanyService,
    private searchService: SearchService,
    private categoryFilter: CategoryFilterService,
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
  }

  updateCategory(): void {
    this.categoryFilter.filter(this.category)
      .subscribe(cards => this.cards = cards.slice());
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
