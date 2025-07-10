import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { NewWatchFabComponent } from "@components/new-watch-fab/new-watch-fab.component";
import { SummaryComponent } from "@components/summary/summary.component";
import { CookieService } from "@services/cookie.service";
import { ThemeService } from "@services/theme.service";
import { WatchService } from "@services/watch.service";
import { StatusService } from "@services/status.service";
import { ToggleAllComponent } from "@components/toggle-all/toggle-all.component";
import { BevakningarCardsComponent } from "@components/bevakningar-cards/bevakningar-cards.component";
import { CookieComponent } from "@components/cookie/cookie.component";
import { TuiLoader, TuiRoot } from "@taiga-ui/core";

@Component({
  selector: "scraper-root",
  imports: [
    TuiRoot,
    TuiLoader,
    HeaderComponent,
    FooterComponent,
    SummaryComponent,
    NewWatchFabComponent,
    ToggleAllComponent,
    BevakningarCardsComponent,
    CookieComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly cookieService = inject(CookieService);
  protected readonly watchService = inject(WatchService);
  protected readonly apiStatus = inject(StatusService).getApiStatusStream;

  constructor() {
    this.cookieService.initializeConsentCookie();

    this.themeService.initializeTheme();
  }
}
