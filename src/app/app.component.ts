import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatSidenavContainer } from "@angular/material/sidenav";

import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { ScraperCardComponent } from "@components/scraper-card/scraper-card.component";

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./app.component.scss",
  standalone: true,
  imports: [MatSidenavContainer, HeaderComponent, FooterComponent, ScraperCardComponent],
})
export class AppComponent {
  /*
  TODO:

    Kolla så att analytics fortfrande fungerar. Koden jag hade här tidigare var till för hantera
    routing men jag tror inte jag behöver det länge

  */
}
