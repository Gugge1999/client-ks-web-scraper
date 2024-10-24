import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { TUI_DARK_MODE, TuiButton, TuiRoot } from "@taiga-ui/core";

import { CardComponent } from "@components/card/card.component";
import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { NewWatchFabComponent } from "@components/new-watch-fab/new-watch-fab.component";
import { SummaryComponent } from "@components/summary/summary.component";
import { CookieService } from "@services/cookie.service";
import { ThemeService } from "@services/theme.service";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SummaryComponent, CardComponent, NewWatchFabComponent, TuiRoot, TuiButton],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly watchService = inject(WatchService);
  private readonly cookieService = inject(CookieService);

  protected readonly darkMode = inject(TUI_DARK_MODE);

  watches = this.watchService.watches;

  ngOnInit() {
    this.cookieService.onInit();

    this.themeService.initializeTheme();

    this.watchService.getAllWatches();
  }
}
