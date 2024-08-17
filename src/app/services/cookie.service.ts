import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CookieComponent } from "@components/dialogs/cookie/cookie.component";
import { CookieState, initCookie } from "@models/cookie";
import { CookieService as CookieServiceLibrary } from "ngx-cookie-service";
import { firstValueFrom, map } from "rxjs";

interface WindowWithAnalytics extends Window {
  dataLayer?: unknown[];
  gtag?(...args: unknown[]): void;
}

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private readonly cookieServiceLibrary = inject(CookieServiceLibrary);
  private readonly matDialog = inject(MatDialog);
  private readonly cookieConsentString = "Cookie consent";
  private window: WindowWithAnalytics = window;

  onInit() {
    if (this.getConsentCookie() === "") {
      this.cookieServiceLibrary.set(this.cookieConsentString, initCookie.toString());
    }

    if (this.getConsentCookie() === initCookie) {
      this.showDialog();
    }
  }

  private async showDialog() {
    const dialogRef = this.matDialog.open(CookieComponent, { disableClose: true });

    const res = await firstValueFrom(dialogRef.afterClosed().pipe(map((res: CookieState) => res)));

    if (res === CookieState.Accepted) {
      // TODO: Lägg till google analytics
      this.cookieServiceLibrary.set(this.cookieConsentString, CookieState.Accepted);
      this.installGoogleAnalytics();
      return;
    }

    if (res === CookieState.Rejected) {
      this.cookieServiceLibrary.set(this.cookieConsentString, CookieState.Rejected);
      return;
    }

    const cookieErrorMessage = "Kunde inte behandla svaret av cookie consent.";

    window.alert(`${cookieErrorMessage} Ladda om sidan och försök igen`);

    console.error(cookieErrorMessage);
  }

  private installGoogleAnalytics() {
    const window = this.window;
    const gAnalyticsId = "G-2M7YJWSQ0F";
    const url = `https://www.googletagmanager.com/gtag/js?id=${gAnalyticsId}`;

    window.dataLayer = this.window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };

    // TODO: js och config läggs inte till i DOM
    window.gtag("js", new Date());

    window.gtag("config", gAnalyticsId);

    const el = window.document.createElement("script");
    el.async = true;
    el.src = url as string;
    el.id = "gtag-script";
    window.document.head.appendChild(el);
  }

  getConsentCookie = () => this.cookieServiceLibrary.get(this.cookieConsentString);

  isCookieAccepted = () => this.cookieServiceLibrary.get(this.cookieConsentString) === CookieState.Accepted;
}
