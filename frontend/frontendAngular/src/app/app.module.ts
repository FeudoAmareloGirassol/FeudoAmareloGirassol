import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { SearchComponent } from './components/search/search.component';
import { CardsViewUserComponent } from './components/cards-view-user/cards-view-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { SearchCardComponent } from './components/search-card/search-card.component';
import{ CategoryCarouselComponent } from './components/category-carousel/category-carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { CompanyScheduleComponent } from './components/company-schedule/company-schedule.component';
import { CustomerScheduleComponent } from './components/customer-schedule/customer-schedule.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    SearchComponent,
    CardsViewUserComponent,
    LoginComponent,
    RegisterCompanyComponent,
    RegisterCustomerComponent,
    ViewUserComponent,
    SearchCardComponent,
    CategoryCarouselComponent,
    NavbarComponent,
    HomeComponent,
    UserHomeComponent,
    CompanyHomeComponent,
    UserConfigComponent,
    CompanyScheduleComponent,
    CustomerScheduleComponent,
    EditCompanyComponent,
    EditCustomerComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    CarouselModule,
    Ng2SearchPipeModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
