import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { verboseErrorMessageConst } from "@constants/constants";
import { AlertService } from "@services/alert.service";
import { catchError, Observable, throwError } from "rxjs";

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((errRes: HttpErrorResponse) => {
      const errStatus = errRes.status;
      const err = errRes.error ?? {};

      try {
        // Returnera tidigt om status är 400. Den kan returneras vid valideringsfel, vilket inte är "riktigt" error
        if (errStatus === 400) {
          return throwError(() => err);
        }

        if (err && verboseErrorMessageConst in err) {
          // TODO :Det kanske bara ska visas i desktop
          alertService.errorAlert("Fullständigt felmeddelande visas finns i console", { sticky: true });
          console.error("verbose error message", err.verboseErrorMessage);
        }

        if (err && "stack" in err) {
          // TODO :Det kanske bara ska visas i desktop
          alertService.errorAlert("Se stacktrace i console", { sticky: true });
          console.error("Stack:", err.stack);
        }

        console.error("Error", err);

        let errMsg: string;

        if (errStatus === 0) {
          errMsg = "Kunde inte ansluta till API:et";
        } else if (errStatus === 404) {
          errMsg = `Kunde inte hitta url till API. Url: ${errRes.url}`;
        } else if (errStatus === 422) {
          errMsg = "Kunde inte hantera anrop. Se console";
        } else if (err.errorMessage) {
          errMsg = err.errorMessage;
        } else {
          // TODO: Lägg till message här
          errMsg = "Något gick fel";
        }

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
