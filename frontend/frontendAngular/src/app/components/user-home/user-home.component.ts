import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { CategoryModel } from '../../api/category';
import { CompanyModel } from '../../api/company';
import { CompanyService } from '../../services/company.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  result = '';
  category = '';
  categories: CategoryModel[] = [
    { value: 'ADVOCACY', viewValue: 'Advocacia' },
    { value: 'HEALTH', viewValue: 'Saúde' },
    { value: 'TECHNICAL_ASSISTANCE', viewValue: 'Assistência Técnica' },
    { value: 'CIVIL_CONSTRUCTION', viewValue: 'Construção Civil' },
    { value: 'BEAUTY', viewValue: 'Beleza' },
    { value: 'EDUCATION', viewValue: 'Educação' },
    { value: 'DOMESTIC_SERVICES', viewValue: 'Serviços Domésticos' },
    { value: 'DESIGN', viewValue: 'Design' },
  ]
  myControl = new FormControl();
  cards: CompanyModel[] = [];
  cards$!: Observable<CompanyModel[]>;
  private searchTerms = new Subject<string>();

  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.getCards();
    this.cards$ = this.searchTerms.pipe(debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.companyService.search(term)),
    );
  }

  OpenDialog(company: CompanyModel) {

    let dialogRef = this.dialog.open(DialogComponent, {
      data: company,
      width: '800px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog result: ${result}`);
    })
  }

  getCards(): void {
    this.companyService.getCompanies()
      .subscribe(cards => this.cards = cards.slice());
  }
  updateCards(): void {
    this.companyService.search(this.result)
      .subscribe(cards => this.cards = cards.slice());
  }

  updateCategory(): void {
    this.companyService.filter(this.category)
      .subscribe(cards => this.cards = cards.slice());
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
