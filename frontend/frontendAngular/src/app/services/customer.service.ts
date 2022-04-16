import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageLoginService } from './local-storage-login.service';
import { CustomerModel, CustomerRequest } from '../api/customer';
import { Observable } from 'rxjs';
import { CompanyModel } from '../api/company';

const apiUrl = 'http://127.0.0.1:8000/api';

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

  GetUsers(): Observable<CompanyModel[]> {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<CompanyModel[]>(`${apiUrl}/users`, options)
  }

}
