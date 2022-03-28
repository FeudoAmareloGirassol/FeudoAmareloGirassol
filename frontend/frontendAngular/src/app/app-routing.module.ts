import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

  const routes: Routes = [
    { 
      path: '', redirectTo: '/view-user', pathMatch: 'full' 
    },
    { 
      path: 'view-user', 
      component: ViewUserComponent 
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
      
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
