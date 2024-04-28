import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";

import { ThemeSwitcherComponent } from "@components/header/theme-switcher/theme-switcher.component";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "scraper-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrl: "./desktop-menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, MatTooltipModule, MatSlideToggleModule, MatIconModule, ThemeSwitcherComponent],
})
export class DesktopMenuComponent {
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
