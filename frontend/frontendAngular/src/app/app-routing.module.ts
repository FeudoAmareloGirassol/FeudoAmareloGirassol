import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';

const routes: Routes = [
    {
      // Criar component coringa -> redirecionar pra login ou homePage
      path: '',
      component: ExampleComponent
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
      path: 'login',
      component: LoginComponent
    },
    // Criar component de home page vazio msm vida q segue
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
