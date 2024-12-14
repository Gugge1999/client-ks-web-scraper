import { inject, Injectable } from "@angular/core";
import { CookieState, initCookie } from "@models/cookie";
import { tap } from "rxjs";
import { TUI_CONFIRM, TuiConfirmData } from "@taiga-ui/kit";
import { TuiDialogService } from "@taiga-ui/core";
import { AlertService } from "@services/alert.service";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private readonly dialogs = inject(TuiDialogService);
  private readonly alertService = inject(AlertService);

  private readonly cookieConsentString = "cookie-consent";
  private window: WindowWithAnalytics = window;

  onInit() {
    if (this.isCookieAccepted()) {
      this.installGoogleAnalytics();
      return;
    }

    if (this.getConsentCookie() === null) {
      localStorage.setItem(this.cookieConsentString, initCookie.toString());
    }

    if (this.getConsentCookie() === initCookie) {
      this.showDialog();
    }
  }

  private showDialog() {
    const data: TuiConfirmData = {
      no: "Neka",
      yes: "Acceptera",
      content: "<p> Cookies använd för analys och för att utöka funktionalitet såsom personliga inställningar</p>",
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, { label: "Acceptera cookies?", size: "m", dismissible: false, closeable: false, data: data })
      .pipe(tap(accepted => this.handleCookieResponse(accepted)))
      .subscribe();
  }

  private handleCookieResponse(accepted: boolean) {
    if (accepted) {
      localStorage.setItem(this.cookieConsentString, CookieState.Accepted);
      this.installGoogleAnalytics();
      return;
    }

    localStorage.setItem(this.cookieConsentString, CookieState.Rejected);
  }

  private installGoogleAnalytics() {
    try {
      const window = this.window;
      const gAnalyticsId = "G-2M7YJWSQ0F";
      const url = `https://www.googletagmanager.com/gtag/js?id=${gAnalyticsId}`;

      window.dataLayer = this.window.dataLayer || [];
      window.gtag = function () {
        // TODO: Går det att fixa?
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };

      window.gtag("js", new Date());

      window.gtag("config", gAnalyticsId);

      const el = window.document.createElement("script");
      el.async = true;
      el.src = url as string;
      el.id = "gtag-script";
      window.document.head.appendChild(el);
    } catch (error) {
      this.cookieError(error);
    }
  }

  private cookieError(error: unknown) {
    const cookieErrorMessage = "Kunde inte behandla samtycke av cookies";
    this.alertService.errorAlert(`${cookieErrorMessage}. Ladda om sidan och försök igen`, { sticky: true });
    console.error(`${cookieErrorMessage}.Error ${error}`);
  }

  getConsentCookie = () => localStorage.getItem(this.cookieConsentString);

  isCookieAccepted = () => localStorage.getItem(this.cookieConsentString) === CookieState.Accepted;
}

interface WindowWithAnalytics extends Window {
  dataLayer?: unknown[];
  gtag?(...args: unknown[]): void;
}
