import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CompanyScheduleComponent } from './components/company-schedule/company-schedule.component';
import { CustomerScheduleComponent } from './components/customer-schedule/customer-schedule.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { PayloadCompanyGuard } from './guards/payload-company.guard';
import { PayloadCustomerGuard } from './guards/payload-customer.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'view-user',
    component: ViewUserComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register/company',
    component: RegisterCompanyComponent
  },
  {
    path: 'register/customer',
    component: RegisterCustomerComponent
  },
  {
    path: 'user/home',
    component: UserHomeComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'company/home',
    component: CompanyHomeComponent,
    canActivate: [AuthenticatedGuard, PayloadCustomerGuard]
  },
  {
    path: 'user/config',
    component: UserConfigComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'company/schedule',
    component: CompanyScheduleComponent,
    canActivate: [AuthenticatedGuard, PayloadCustomerGuard]
  },
  {
    path: 'customer/schedule',
    component: CustomerScheduleComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'company/edit',
    component: EditCompanyComponent,
    canActivate: [AuthenticatedGuard, PayloadCustomerGuard]
  },
  {
    path: 'customer/edit',
    component: EditCustomerComponent,
    canActivate: [AuthenticatedGuard, PayloadCustomerGuard]
  },
  {
    path: 'company/home',
    component: CompanyHomeComponent,
    canActivate: [AuthenticatedGuard, PayloadCompanyGuard]
  },
  {
    path: 'company/schedule',
    component: CompanyScheduleComponent,
    canActivate: [AuthenticatedGuard, PayloadCompanyGuard]
  },
  {
    path: 'company/edit',
    component: EditCompanyComponent,
    canActivate: [AuthenticatedGuard, PayloadCompanyGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
