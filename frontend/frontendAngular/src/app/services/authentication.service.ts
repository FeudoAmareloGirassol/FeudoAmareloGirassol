import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../api/authentication';
import { LoginResponse } from '../api/login';

const apiUrl = 'http://127.0.0.1:8000/api/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http: HttpClient) { }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${apiUrl}`, request)
  }
}
