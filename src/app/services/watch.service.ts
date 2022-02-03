import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NewWatch } from '../models/new-watch.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  REST_API: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  // Ändra från any till interface eller class?
  // https://www.positronx.io/build-angular-crud-application-with-nodejs-and-express-rest-api/
  addNewWatch(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/add-watch`;
    return this.httpClient
      .post(API_URL, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllWatches(): Observable<any> {
    let API_URL = `${this.REST_API}/all-watches`;
    return this.httpClient
      .get(API_URL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Error
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
