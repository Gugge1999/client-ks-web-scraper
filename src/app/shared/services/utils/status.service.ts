import { catchError, Observable, throwError } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiStatus } from '@models/api-status.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  REST_API: string = 'http://192.168.1.2:3000';

  constructor(private http: HttpClient) {}

  getApiStatus(): Observable<ApiStatus> {
    const API_URL = `${this.REST_API}/api-status`;

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
