import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { verboseErrorMessageConst } from "@models/constants";
import { SnackbarService } from "@services/snackbar.service";
import { Observable, catchError, throwError } from "rxjs";

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((errRes: HttpErrorResponse) => {
      const errStatus = errRes.status;
      const err = errRes.error;

      try {
        // Returnera tidigt om status är 400. Den kan returneras vid valideringsfel, vilket inte är "riktigt" error
        if (errStatus === 400) {
          return throwError(() => err);
        }

        if (verboseErrorMessageConst in err) {
          console.error("Verbose error message", err.verboseErrorMessage);
        }

        console.error("Error", err);

        snackbarService.errorSnackbar(errStatus === 0 ? "Could not connect to API" : err.errorMessage);

        return throwError(() => err);
      } catch (error) {
        snackbarService.errorSnackbar("Something went wrong in errorInterceptor");

        console.error("Something went wrong in errorInterceptor", error);

        return throwError(() => error);
      }
    }),
  );
}
