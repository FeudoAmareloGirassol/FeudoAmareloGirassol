import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel, CompanyRequest } from '../api/company';
import { SchedulingModel, SchedulingRequest } from '../api/scheduling';
import { LocalStorageLoginService } from './local-storage-login.service';

const apiUrl = 'http://127.0.0.1:8000/api'

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
    return this.http.get<CompanyModel[]>(`${apiUrl}/companies`, options)
  }

  registerCompany(request: CompanyRequest) {
    return this.http.post<CompanyModel>(`${apiUrl}/auth/register/company`, request);
  }

  registerScheduling(request: SchedulingRequest) {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<SchedulingModel>(`${apiUrl}/scheduling`, request, options)};

    getScheduling() {

      const token = this.localStorage.get("token");
      const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const options = {
        headers: header,
      };

      return this.http.get(`${apiUrl}/scheduling`, options);
    }
}
