import { inject, Injectable } from "@angular/core";
import { CookieState, initCookie } from "@models/cookie";
import { CookieService as CookieServiceLibrary } from "ngx-cookie-service";
import { take, tap } from "rxjs";
import { TUI_CONFIRM, TuiConfirmData } from "@taiga-ui/kit";
import { TuiDialogService } from "@taiga-ui/core";
import { AlertService } from "@services/alert.service";

interface WindowWithAnalytics extends Window {
  dataLayer?: unknown[];
  gtag?(...args: unknown[]): void;
}

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private readonly cookieServiceLibrary = inject(CookieServiceLibrary);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alertService = inject(AlertService);

  private readonly cookieConsentString = "Cookie consent";
  private window: WindowWithAnalytics = window;

  onInit() {
    if (this.isCookieAccepted()) {
      this.installGoogleAnalytics();
      return;
    }

    if (this.getConsentCookie() === "") {
      this.cookieServiceLibrary.set(this.cookieConsentString, initCookie.toString());
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
      .open<boolean | undefined>(TUI_CONFIRM, {
        label: "Acceptera cookies?",
        size: "m",
        dismissible: false,
        closeable: false,
        data: data,
      })
      .pipe(
        tap(accepted => {
          if (accepted) {
            this.cookieServiceLibrary.set(this.cookieConsentString, CookieState.Accepted);
            this.installGoogleAnalytics();
            return;
          }

          this.cookieServiceLibrary.set(this.cookieConsentString, CookieState.Rejected);
        }),
        take(1),
      )
      .subscribe();
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
    const cookieErrorMessage = "Kunde inte behandla samtycke av cookies.";
    // TODO: Byt till Taiga ui alert

    window.alert(`${cookieErrorMessage} Ladda om sidan och försök igen`);
    console.error(`${cookieErrorMessage}.Error ${error}`);
  }

  getConsentCookie = () => this.cookieServiceLibrary.get(this.cookieConsentString);

  isCookieAccepted = () => this.cookieServiceLibrary.get(this.cookieConsentString) === CookieState.Accepted;
}
