import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMessage = '';

        if (httpErrorResponse.status === 0) {
          errorMessage = 'Could not connect to API';
        } else if (httpErrorResponse.status === 404) {
          errorMessage = `Page not found. URL: ${httpErrorResponse.url}`;
        } else {
          errorMessage = httpErrorResponse.error;
        }

        if (httpErrorResponse.error instanceof ErrorEvent) {
          // client-side error. Ska den hanteras på något annat sätt?
          this.snackbarService.errorSnackbar(errorMessage);
        } else {
          // server-side error
          this.snackbarService.errorSnackbar(errorMessage);
        }

        return throwError(() => errorMessage);
      })
    );
  }
}
