import { Component, inject, OnInit, resource } from "@angular/core";
import { TuiRoot } from "@taiga-ui/core";
import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { NewWatchFabComponent } from "@components/new-watch-fab/new-watch-fab.component";
import { SummaryComponent } from "@components/summary/summary.component";
import { CookieService } from "@services/cookie.service";
import { ThemeService } from "@services/theme.service";
import { WatchService } from "@services/watch.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { INITIAL_API_STATUS } from "@constants/constants";
import { StatusService } from "@services/status.service";
import { ToggleAllComponent } from "@components/toggle-all/toggle-all.component";
import { BevakningarCardsComponent } from "@components/bevakningar-cards/bevakningar-cards.component";
import { Watch } from "@models/watch.model";
import { env } from "@env/env";
import { Analytics } from "@angular/fire/analytics";

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  imports: [
    HeaderComponent,
    FooterComponent,
    SummaryComponent,
    NewWatchFabComponent,
    TuiRoot,
    ToggleAllComponent,
    BevakningarCardsComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly watchService = inject(WatchService);
  private readonly cookieService = inject(CookieService);
  private readonly statusService = inject(StatusService);
  private readonly bevakningarUrl = `${env.apiUrl}/bevakningar`;
  // noinspection JSUnusedLocalSymbols
  /** **OBS:** Den måste vara kvar för att analytics ska fungera */
  // TODO: Den här borde endast anropas när användaren har godkänt cookies. Det kanske går att skapa en komponent som endast
  //  instansieras när cookies är godkända
  private readonly analytics = inject(Analytics);

  protected isDarkMode = this.themeService.isDarkMode;
  watches = this.watchService.watches;

  readonly apiStatus = toSignal(this.statusService.getApiStatus(), { initialValue: INITIAL_API_STATUS });

  // TODO: Läs https://www.angularspace.com/everything-you-need-to-know-abour-resource-for-now/
  todosResource = resource({
    loader: () => fetch(`${this.bevakningarUrl}/all-watches`).then(res => res.json() as Promise<Watch[]>),
  });

  updateTodo() {
    // this.todosResource.value.update(value => {
    //   if (!value) {
    //     return undefined;
    //   }
    //
    //   return { ...value, title: "updated" };
    // });
  }

  ngOnInit() {
    this.cookieService.onInit();

    this.themeService.initializeTheme();

    this.watchService.getAllWatches();
  }
}
