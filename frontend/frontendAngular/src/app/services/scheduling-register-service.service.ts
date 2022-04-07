import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchedulingModel, SchedulingRequest } from '../api/scheduling';
import { LocalStorageLoginService } from './local-storage-login.service';

const apiUrl = 'http://127.0.0.1:8000/api/auth/scheduling';

@Injectable({
  providedIn: 'root'
})
export class SchedulingRegisterServiceService {
  constructor(
    public http: HttpClient,
    private lsls: LocalStorageLoginService
    ) { }

  registerScheduling(request: SchedulingRequest) {
    const token = this.lsls.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<SchedulingModel>(`${apiUrl}`, request, { headers: header })};
  }
