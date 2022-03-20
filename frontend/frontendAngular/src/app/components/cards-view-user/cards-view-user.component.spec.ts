import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsViewUserComponent } from './cards-view-user.component';

describe('CardsViewUserComponent', () => {
  let component: CardsViewUserComponent;
  let fixture: ComponentFixture<CardsViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsViewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
