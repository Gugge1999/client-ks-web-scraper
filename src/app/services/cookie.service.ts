import { computed, inject, Injectable, signal } from "@angular/core";
import { CookieState, initCookie } from "@models/cookie";
import { tap } from "rxjs";
import { TUI_CONFIRM, TuiConfirmData } from "@taiga-ui/kit";
import { TuiDialogService } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private readonly dialogs = inject(TuiDialogService);
  private readonly cookieConsentString = "cookie-consent";
  private readonly cookieAcceptedSig = signal(false);

  readonly cookieAccepted = computed(() => this.cookieAcceptedSig());

  onInit() {
    if (this.isCookieAccepted()) {
      this.cookieAcceptedSig.set(true);
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
    const confirmData: TuiConfirmData = {
      no: "Neka",
      yes: "Acceptera",
      content: "<p>Cookies använd för analys och för att utöka funktionalitet såsom personliga inställningar</p>",
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: "Acceptera cookies?",
        size: "m",
        dismissible: false,
        closeable: false,
        data: confirmData,
      })
      .pipe(tap(isAccepted => this.handleCookieResponse(isAccepted)))
      .subscribe();
  }

  private handleCookieResponse(isAccepted: boolean) {
    if (isAccepted) {
      localStorage.setItem(this.cookieConsentString, CookieState.Accepted);
      this.cookieAcceptedSig.set(true);
      return;
    }

    localStorage.setItem(this.cookieConsentString, CookieState.Rejected);
  }

  getConsentCookie = () => localStorage.getItem(this.cookieConsentString);

  isCookieAccepted = () => localStorage.getItem(this.cookieConsentString) === CookieState.Accepted;
}
