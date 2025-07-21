import { computed, inject, Injectable, signal } from "@angular/core";
import { CookieState, initialCookie } from "@models/cookie";
import { tap } from "rxjs";
import { TUI_CONFIRM, TuiConfirmData } from "@taiga-ui/kit";
import { TuiDialogService } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private readonly dialogs = inject(TuiDialogService);
  private readonly cookieAcceptedSig = signal(false);

  readonly isCookieAccepted = computed(() => this.cookieAcceptedSig());

  initializeConsentCookie() {
    if (this.isCookieAcceptedFromLocalStorage()) {
      this.cookieAcceptedSig.set(true);
      return;
    }

    if (this.getConsentCookie() === null) {
      localStorage.setItem(cookieConsentString, initialCookie.toString());
    }

    if (this.getConsentCookie() === initialCookie) {
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
      localStorage.setItem(cookieConsentString, CookieState.Accepted);
      this.cookieAcceptedSig.set(true);
      return;
    }

    localStorage.setItem(cookieConsentString, CookieState.Rejected);
  }

  getConsentCookie = () => localStorage.getItem(cookieConsentString);

  isCookieAcceptedFromLocalStorage = () => localStorage.getItem(cookieConsentString) === CookieState.Accepted;
}

const cookieConsentString = "cookie-consent";
