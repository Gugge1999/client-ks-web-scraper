import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SnackbarService } from "../snackbar/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
          if (httpErrorResponse.status === 0 && sessionStorage.getItem("firstApiError") === "yes") {
            console.error(errorMessage);
          } else if (httpErrorResponse.status === 0) {
            this.snackbarService.errorSnackbar(errorMessage);
            sessionStorage.setItem("firstApiError", "yes");
          } else {
            this.snackbarService.errorSnackbar(errorMessage);
          }
        }

        return throwError(() => errorMessage);
      })
    );
  }
}
