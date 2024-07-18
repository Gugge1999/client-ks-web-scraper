import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CookieComponent } from "@components/dialogs/cookie/cookie.component";
import { CookieState, initCookie } from "@models/cookie";
import { CookieService as CookieServiceLibrary } from "ngx-cookie-service";
import { firstValueFrom, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private readonly cookieServiceLibrary = inject(CookieServiceLibrary);
  private readonly matDialog = inject(MatDialog);
  private readonly cookieConsentString = "Cookie consent";

  async onInit() {
    if (this.getConsentCookie() === "") {
      this.cookieServiceLibrary.set(this.cookieConsentString, initCookie.toString());
    }

    if (this.getConsentCookie() === initCookie) {
      this.showDialog();
    }
  }

  private async showDialog() {
    const dialogRef = this.matDialog.open(CookieComponent, { disableClose: true });

    const res = await firstValueFrom(dialogRef.afterClosed().pipe(map((res: CookieState | undefined) => res)));

    if (res === CookieState.Accepted) {
      this.cookieServiceLibrary.set(this.cookieConsentString, CookieState.Accepted);
      return;
    }

    if (res === CookieState.Rejected) {
      this.cookieServiceLibrary.set(this.cookieConsentString, CookieState.Rejected);
      return;
    }

    console.error("Kunde inte behandla svaret av cookie consent");
  }

  getConsentCookie = () => this.cookieServiceLibrary.get(this.cookieConsentString);

  isCookieAccepted = () => this.cookieServiceLibrary.get(this.cookieConsentString) === CookieState.Accepted;
}
