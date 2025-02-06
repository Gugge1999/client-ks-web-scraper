import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AlertService } from "@services/alert.service";
import { catchError, throwError } from "rxjs";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { TUI_IS_MOBILE } from "@taiga-ui/cdk";

let isFirstErrorWithStack = true;

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const alertService = inject(AlertService);
  const isMobile = inject(TUI_IS_MOBILE);

  return next(req).pipe(
    catchError((errRes: HttpErrorResponse) => {
      const errStatus = errRes.status;
      const err = errRes.error ?? null;

      try {
        // Returnera tidigt om status är 400. Den kan returneras vid valideringsfel, vilket inte är "riktigt" error
        if (errStatus === 400) {
          return throwError(() => err);
        }

        if (err && STACK_API_ERROR_PROPERTY in err && isMobile === false && isFirstErrorWithStack) {
          isFirstErrorWithStack = false;
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
          errMsg = "Något gick fel";
        }

        alertService.errorAlert(errMsg);
        return throwError(() => err);
      } catch (error) {
        const catchErrMsg = "Nånting gick fel i errorInterceptor";
        alertService.errorAlert(catchErrMsg);

        console.error(catchErrMsg, error);

        return throwError(() => error);
      }
    }),
  );
}
