import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { Store } from "@ngrx/store";

import { ScraperCardComponent } from "@components/scraper-card/scraper-card.component";
import { FooterComponent } from "@shared/layout/footer/footer.component";
import { HeaderComponent } from "@shared/layout/header/header.component";
import { loadWatches } from "@store/actions/watch-api.actions";

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

  /*
  TODO:

    Kolla så att analytics fortfrande fungerar. Koden jag hade här tidigare var till för hantera
    routing men jag tror inte jag behöver det länge

  */

  ngOnInit() {
    this.store.dispatch(loadWatches());
  }
}
