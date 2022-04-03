import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModel, CompanyRequest } from '../api/company';

const apiUrl = 'http://127.0.0.1:8000/api/auth/register/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegisterService {
  constructor(public http: HttpClient) { }

  registerCompany(request: CompanyRequest) {
    return this.http.post<CompanyModel>(`${apiUrl}`, request);
  }
}
