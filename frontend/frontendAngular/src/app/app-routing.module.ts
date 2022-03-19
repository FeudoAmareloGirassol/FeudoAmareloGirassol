import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';

const routes: Routes = [
    {
      path: '',
      component: ExampleComponent
      
    },
    {
      path: 'login',
      component: LoginComponent
      
    },
    {
      path: 'cadastro/empresa',
      component: RegisterCompanyComponent
      
    },
    {
      path: 'cadastro/usuario',
      component: RegisterCustomerComponent
      
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
