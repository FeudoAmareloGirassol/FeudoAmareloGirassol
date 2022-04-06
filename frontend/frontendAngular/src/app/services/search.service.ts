import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { CompanyModel } from '../api/company';
import { LocalStorageLoginService } from './local-storage-login.service';

const apiUrl = 'http://127.0.0.1:8000/api/auth/companies/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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
    return this.http.get<CompanyModel[]>(`${apiUrl}?search=${term}`, options)
  }
}
