import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { CompanyModel } from '../api/company';
import { LocalStorageLoginService } from './local-storage-login.service';

const apiUrl = 'https://api-mark-it.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private http: HttpClient,
    public localStorage: LocalStorageLoginService,
  ) { }

  search(term: string): Observable<CompanyModel[]> {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<CompanyModel[]>(`${apiUrl}/companies?search=${term}`, options)
  }

  filter(term: string): Observable<CompanyModel[]> {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<CompanyModel[]>(`${apiUrl}/companies/filter?category=${term}`, options)
  }
}
