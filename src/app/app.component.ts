import { ChangeDetectionStrategy, Component, inject, OnInit, resource } from "@angular/core";
import { TUI_DARK_MODE, TuiRoot } from "@taiga-ui/core";
import { CardComponent } from "@components/card/card.component";
import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { NewWatchFabComponent } from "@components/new-watch-fab/new-watch-fab.component";
import { SummaryComponent } from "@components/summary/summary.component";
import { CookieService } from "@services/cookie.service";
import { ThemeService } from "@services/theme.service";
import { WatchService } from "@services/watch.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { INITIAL_API_STATUS } from "@constants/constants";
import { StatusService } from "@services/status.service";

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, FooterComponent, SummaryComponent, CardComponent, NewWatchFabComponent, TuiRoot],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly watchService = inject(WatchService);
  private readonly cookieService = inject(CookieService);
  private readonly statusService = inject(StatusService);

  protected readonly darkMode = inject(TUI_DARK_MODE);

  watches = this.watchService.watches;

  apiStatus = toSignal(timer(0, 30_000).pipe(switchMap(() => this.statusService.getApiStatus())), {
    initialValue: INITIAL_API_STATUS,
  });

  todosResource = resource({
    loader: () => fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`).then(res => res.json() as Promise<any[]>),
  });

  updateTodo() {
    this.todosResource.value.update(value => {
      if (!value) {
        return undefined;
      }

      return { ...value, title: "updated" };
    });
  }

  ngOnInit() {
    this.cookieService.onInit();

    this.themeService.initializeTheme();

    this.watchService.getAllWatches();
  }
}
