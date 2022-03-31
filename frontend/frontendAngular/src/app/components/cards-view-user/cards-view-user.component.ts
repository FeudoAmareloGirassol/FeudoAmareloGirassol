import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/api/company';
import { GetCompanyService } from 'src/app/services/get-companies.service';

@Component({
  selector: 'app-cards-view-user',
  templateUrl: './cards-view-user.component.html',
  styleUrls: ['./cards-view-user.component.scss']
})
export class CardsViewUserComponent implements OnInit {
  cards: CompanyModel[] = [];

  constructor(private getCompanyService: GetCompanyService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.getCompanyService.getCompanies()
      .subscribe(cards => this.cards = cards.slice(1, 5));
  }
}
