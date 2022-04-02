import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../api/categoria';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewUserService {
  private categoriasUrl = 'api/categorias';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl)
      .pipe(
        tap(_ => this.log('fetched categorias')),
        catchError(this.handleError<Categoria[]>('getCategorias', []))
      );
  }

  getCategoria(id: number): Observable<Categoria> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => this.log(`fetched categoria id=${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    );
  }

  search(term: string): Observable<Categoria[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Categoria[]>(`${this.categoriasUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found categorias matching "${term}"`) :
        this.log(`no categorias matching "${term}"`)),
      catchError(this.handleError<Categoria[]>('searchCategorias', []))
    );
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, categoria, this.httpOptions).pipe(
      tap((newCategoria: Categoria) => this.log(`added categoria w/ id=${newCategoria.id}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }


  updateCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(this.categoriasUrl, categoria, this.httpOptions).pipe(
      tap(_ => this.log(`updated categoria id=${categoria.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
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

  private log(message: string) {
    this.messageService.add(`ViewUserService: ${message}`);
  }

}
