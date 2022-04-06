import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageLoginService } from './local-storage-login.service';
import { CustomerModel, CustomerRequest } from '../api/customer';

const apiUrl = 'http://127.0.0.1:8000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    public http: HttpClient,
    public localStorage: LocalStorageLoginService
  ) { }

  registerCustomer(request: CustomerRequest) {
    return this.http.post<CustomerModel>(`${apiUrl}/register/customer`, request);
  }
}