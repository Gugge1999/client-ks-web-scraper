import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ThemeService } from "@services/theme.service";

import { Theme } from "@models/constants";
import { FooterThemeColor } from "@models/theme.model";

@Component({
  selector: "scraper-footer",
  templateUrl: "./footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FooterComponent {
  constructor(private themeService: ThemeService) {}

  protected readonly darkModeFooterColors: FooterThemeColor = {
    top: "#5c5c5c",
    middle: "#4f4f4f",
    bottom: "#404040",
  };

  protected readonly lightModeFooterColors: FooterThemeColor = {
    top: "#ededed",
    middle: "#c9c9c9",
    bottom: "#999999",
  };

  protected readonly darkModeConst = Theme.dark;

  protected readonly currentTheme = this.themeService.getCurrentTheme();
}
