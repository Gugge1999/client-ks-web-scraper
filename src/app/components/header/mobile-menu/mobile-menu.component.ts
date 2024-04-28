import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";

import { ThemeSwitcherComponent } from "@components/header/theme-switcher/theme-switcher.component";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "scraper-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./mobile-menu.component.scss",
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatTooltipModule, ThemeSwitcherComponent],
})
export class MobileMenuComponent {
  apiStatus = input.required<ApiStatus>();
  isDarkMode = input.required<boolean>();

  toggleTheme = output();
  openApiStatusDialog = output();

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onOpenApiStatusDialog() {
    this.openApiStatusDialog.emit();
  }
}
