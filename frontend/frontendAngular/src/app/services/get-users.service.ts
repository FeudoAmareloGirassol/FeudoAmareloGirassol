import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageLoginService } from './local-storage-login.service';
import { CompanyModel } from '../api/company';
import { catchError, Observable, retry } from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api/auth/get';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(
    public http: HttpClient,
    public localStorage: LocalStorageLoginService
  ) { }

  getUsers(): Observable<CompanyModel[]> {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<CompanyModel[]>(`${apiUrl}`, options)
  }
}
