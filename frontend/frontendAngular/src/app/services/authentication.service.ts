import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../api/authentication';
import { UserModel } from '../api/user';

const apiUrl = 'http://127.0.0.1:8000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public http: HttpClient) { }

  login(request: LoginRequest){
    return this.http.post<UserModel>(`${apiUrl}/login`, request);
  }
}
