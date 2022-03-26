import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewUserDetailComponent } from './components/view-user-detail/view-user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';

  const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: ViewUserDetailComponent },
    { path: 'categorias', component: ViewUserComponent },
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
      
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
