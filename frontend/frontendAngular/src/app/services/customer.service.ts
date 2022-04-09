import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageLoginService } from './local-storage-login.service';
import { CustomerModel, CustomerRequest } from '../api/customer';

const apiUrl = 'https://api-mark-it.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    public http: HttpClient,
    public localStorage: LocalStorageLoginService
  ) { }

  registerCustomer(request: CustomerRequest) {
    return this.http.post<CustomerModel>(`${apiUrl}/auth/register/customer`, request);
  }
}