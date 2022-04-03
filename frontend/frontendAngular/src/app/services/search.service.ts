import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { CompanyModel } from '../api/company';
import { LocalStorageLoginService } from './local-storage-login.service';
import { MessageService } from './message.service';

const apiUrl = 'http://127.0.0.1:8000/api/auth/companies/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
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
    return this.http.get<CompanyModel[]>(`${apiUrl}?search=${term}`, options).pipe(
      tap(x => x.length ?
        this.log(`found companies matching "${term}"`) :
        this.log(`no cards matching "${term}"`)),
      catchError(this.handleError<CompanyModel[]>('searchCompany', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`SearchService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
