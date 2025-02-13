import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Analytics } from "@angular/fire/analytics";

@Component({
  selector: "scraper-cookie",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class CookieComponent {
  // noinspection JSUnusedLocalSymbols
  /** **OBS:** Den måste vara kvar för att analytics ska fungera */
  private readonly analytics = inject(Analytics);
}
