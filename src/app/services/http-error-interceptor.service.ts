import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackbarService } from "@services/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorMessage = httpErrorResponse.status === 0 ? "Could not connect to API" : httpErrorResponse.error;
        console.error(errorMessage);

        this.snackbarService.errorSnackbar(errorMessage);

        return throwError(() => errorMessage);
      }),
    );
  }
}
