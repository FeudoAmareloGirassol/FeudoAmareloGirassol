import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExampleComponent } from './components/example/example.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewUserDetailComponent } from './components/view-user-detail/view-user-detail.component';
import { MessageComponent } from './components/message/message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { CardsViewUserComponent } from './components/cards-view-user/cards-view-user.component'; // <-- NgModel lives here
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    ViewUserComponent,
    ViewUserDetailComponent,
    MessageComponent,
    DashboardComponent,
    SearchComponent,
    CardsViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
