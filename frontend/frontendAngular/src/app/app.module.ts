import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewUserDetailComponent } from './components/view-user-detail/view-user-detail.component';
import { MessageComponent } from './components/message/message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { CardsViewUserComponent } from './components/cards-view-user/cards-view-user.component'; // <-- NgModel lives here
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewUserComponent,
    ViewUserDetailComponent,
    MessageComponent,
    DashboardComponent,
    SearchComponent,
    CardsViewUserComponent,
    LoginComponent,
    RegisterCompanyComponent,
    RegisterCustomerComponent
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
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
