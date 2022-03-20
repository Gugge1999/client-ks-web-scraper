import { catchError, Observable, throwError } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiStatus } from '../models/api-status.model';
import { Watch } from '../models/watch.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  REST_API: string = 'http://192.168.1.2:3000';

  constructor(private http: HttpClient) {}

  addNewWatch(data: Partial<Watch>): Observable<Watch> {
    const API_URL = `${this.REST_API}/add-watch`;

    return this.http
      .post<Watch>(API_URL, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllWatches(): Observable<Watch[]> {
    const API_URL = `${this.REST_API}/all-watches`;

    return this.http
      .get<Watch[]>(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateActiveStatus(watch: Partial<Watch>): Observable<string> {
    const API_URL = `${this.REST_API}/update-active-status`;
    const data = { isActive: watch.active, label: watch.label, id: watch.id };

    return this.http
      .put<string>(API_URL, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteWatch(id: string): Observable<string> {
    const API_URL = `${this.REST_API}/delete-watch/${id}`;

    return this.http
      .delete<string>(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  isApiActive(): Observable<ApiStatus> {
    const API_URL = `${this.REST_API}/is-api-active`;

    return this.http
      .get<ApiStatus>(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Byt ut mot HttpInterceptor. Se: https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices/
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }
}
