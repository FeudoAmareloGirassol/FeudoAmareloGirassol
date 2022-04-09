import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel, CompanyRequest } from '../api/company';
import { LocalStorageLoginService } from './local-storage-login.service';

const apiUrl = 'https://api-mark-it.herokuapp.com/api'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    public http: HttpClient,
    public localStorage: LocalStorageLoginService
  ) { }

  getCompanies(): Observable<CompanyModel[]> {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<CompanyModel[]>(`${apiUrl}/get/company`, options)
  }

  registerCompany(request: CompanyRequest) {
    return this.http.post<CompanyModel>(`${apiUrl}/auth/register/company`, request);
  }
}