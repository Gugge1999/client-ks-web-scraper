import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
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

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    SummaryComponent,
    NewWatchFabComponent,
    ToggleAllComponent,
    BevakningarCardsComponent,
    CookieComponent,
  ],
})
export class AppComponent implements OnInit {
  protected readonly themeService = inject(ThemeService);
  protected readonly cookieService = inject(CookieService);
  protected readonly watchService = inject(WatchService);
  private readonly statusService = inject(StatusService);

  readonly apiStatus = this.statusService.getApiStatusStream;

  ngOnInit() {
    this.cookieService.onInit();

    this.themeService.initializeTheme();
  }
}
