import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";

import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { ScraperCardComponent } from "@components/scraper-container/scraper-container.component";
import { ThemeService } from "@services/theme.service";

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./app.component.scss",
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ScraperCardComponent],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
