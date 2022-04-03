import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerModel, CustomerRequest } from '../api/customer';


const apiUrl = 'http://127.0.0.1:8000/api/auth/register/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerRegisterService {
  constructor(public http: HttpClient) { }

  registerCustomer(request: CustomerRequest) {
    return this.http.post<CustomerModel>(`${apiUrl}`, request);
  }
}
