import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { LoginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
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
      path: 'user-view',
      component: UserViewComponent,
      canActivate: [LoginGuardGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
