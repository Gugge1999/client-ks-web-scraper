import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackbarService } from "@shared/services/snackbar/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMessage = "";

        if (httpErrorResponse.status === 0) {
          errorMessage = "Could not connect to API";
        } else {
          errorMessage = httpErrorResponse.error;
        }

        if (httpErrorResponse.error instanceof ErrorEvent) {
          // client-side error. Ska den hanteras på något annat sätt?
          this.snackbarService.errorSnackbar(errorMessage);
        } else {
          // server-side error
          if (httpErrorResponse.status === 0) {
            console.error(errorMessage);
          } else {
            this.snackbarService.errorSnackbar(errorMessage);
          }
        }

        return throwError(() => errorMessage);
      }),
    );
  }
}
