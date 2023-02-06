import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FETCH_LIMIT_TOKEN } from '../config';
import { QueryResult } from '../state/books/books.state';
import { ApiResopnse } from '../models/response.mode';
import { LimitConfig } from '../models/toke.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly BOOKS_API_URL: string = 'https://gutendex.com/books';
  private readonly DEFAULT_LIMIT: number = 10;
  private readonly apiUrl: URL;

  constructor(private http: HttpClient, @Inject(FETCH_LIMIT_TOKEN) private config: LimitConfig) {
    this.apiUrl = new URL(this.BOOKS_API_URL);
  }

  public resolveQuery(query: string, existingData: QueryResult | undefined): Observable<QueryResult> {
    if (existingData?.data?.length) {
      return of(existingData);
    }
    return this.fetchApiByQuery(query);
  }

  public fetchApiByQuery(query: string): Observable<QueryResult> {
    this.apiUrl.searchParams.set('topic', encodeURIComponent(query));
    return this.fetchApi(this.apiUrl.href);
  }

  public fetchApi(url: string): Observable<QueryResult> {
    return this.http.get<ApiResopnse>(url, {responseType: 'json'}).pipe(
      map((res: ApiResopnse) => ({
          next: res.next ?? undefined,
          data: res.results?.slice(0, this.config.limit || this.DEFAULT_LIMIT) || []
        })))
  }
}
