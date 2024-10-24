import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { verboseErrorMessageConst } from "@constants/constants";
import { AlertService } from "@services/alert.service";
import { Observable, catchError, throwError } from "rxjs";

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const alertService = inject(AlertService);

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

        const errMsg = errStatus === 0 ? "Kunde inte ansluta till API:et" : err.errorMessage;
        alertService.errorAlert(errMsg);

        return throwError(() => err);
      } catch (error) {
        alertService.errorAlert("Nånting gick fel i errorInterceptor");

        console.error("Something went wrong in errorInterceptor", error);

        return throwError(() => error);
      }
    }),
  );
}
