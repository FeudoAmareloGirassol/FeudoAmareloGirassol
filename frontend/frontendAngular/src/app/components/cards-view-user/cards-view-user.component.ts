import { Component, OnInit } from '@angular/core';
import { Card } from '../../api/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-cards-view-user',
  templateUrl: './cards-view-user.component.html',
  styleUrls: ['./cards-view-user.component.scss']
})
export class CardsViewUserComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards.slice());
  }
}
