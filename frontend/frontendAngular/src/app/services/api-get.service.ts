import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageLoginService } from './local-storage-login.service';

@Injectable({
  providedIn: 'root'
})

export class APIGETService {

  SERVER_URL = 'http://127.0.0.1:8000'

  constructor(
    private http: HttpClient,
    private lsls:LocalStorageLoginService
    ) { }

  public getAPI(){

    const token = this.lsls.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
   };

   return this.http.get('http://127.0.0.1:8000/api/auth/get/', {headers:header});
  }

  public getAPIID(id:string){

    const token = this.lsls.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
   };

   return this.http.get(`http://127.0.0.1:8000/api/auth/get/${id}`, {headers:header});
  }
}




