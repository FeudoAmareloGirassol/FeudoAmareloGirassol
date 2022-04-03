import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Card } from '../api/card';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsUrl = 'api/cards';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
  }

  search(term: string): Observable<Card[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Card[]>(`${this.cardsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found cards matching "${term}"`) :
        this.log(`no cards matching "${term}"`)),
      catchError(this.handleError<Card[]>('searchCards', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ViewUserService: ${message}`);
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
