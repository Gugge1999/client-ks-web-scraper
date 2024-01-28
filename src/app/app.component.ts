import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { Store } from "@ngrx/store";

import { ScraperCardComponent } from "@components/scraper-card/scraper-card.component";
import { FooterComponent } from "@shared/layout/footer/footer.component";
import { HeaderComponent } from "@shared/layout/header/header.component";
import { loadWatches } from "@store/actions/watch-api.actions";

// TODO: Försök hitta en fix på det här
// eslint-disable-next-line @typescript-eslint/ban-types
declare const gtag: Function;

@Component({
  selector: "ks-scraper-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./app.component.scss",
  standalone: true,
  imports: [MatSidenavContainer, HeaderComponent, FooterComponent, ScraperCardComponent],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.setUpAnalytics();

    sessionStorage.removeItem("firstApiError");

    this.store.dispatch(loadWatches());
  }

  setUpAnalytics() {
    gtag("config", "G-2M7YJWSQ0F");
  }
}
