import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";

import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "scraper-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrl: "./desktop-menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, MatTooltipModule, MatSlideToggleModule, MatIconModule],
})
export class DesktopMenuComponent {
  apiStatus = input.required<ApiStatus>();
  isDarkMode = input.required<boolean>();

  @Output() toggleTheme = new EventEmitter<void>();
  @Output() openApiStatusDialog = new EventEmitter<void>();

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onOpenApiStatusDialog() {
    this.openApiStatusDialog.emit();
  }
}
