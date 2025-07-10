import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Analytics } from "@angular/fire/analytics";

@Component({
  selector: "scraper-cookie",
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieComponent {
  // noinspection JSUnusedLocalSymbols
  /** **OBS:** Den måste vara kvar för att analytics ska fungera */
  private readonly analytics = inject(Analytics);
}
