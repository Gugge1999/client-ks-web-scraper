import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SnackbarService } from "@services/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly snackbarService = inject(SnackbarService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorMessage = httpErrorResponse.status === 0 ? "Could not connect to API" : httpErrorResponse.error;
        console.error(errorMessage);

        if (httpErrorResponse.status === 400) {
          return throwError(() => httpErrorResponse.error);
        }

        this.snackbarService.errorSnackbar(errorMessage);

        return throwError(() => errorMessage);
      }),
    );
  }
}
