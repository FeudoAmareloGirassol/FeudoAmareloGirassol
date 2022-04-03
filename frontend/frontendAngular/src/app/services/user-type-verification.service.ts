import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyRequest } from '../api/company';

const apiUrl = 'http://127.0.0.1:8000/api/auth/register/company';

@Injectable({
  providedIn: 'root'
})
export default class UserTypeVerificationService {

  constructor(public http: HttpClient) { }

  verification(): Observable<CompanyRequest> {
    return this.http.get<CompanyRequest>(`${apiUrl}`)
  }
}
