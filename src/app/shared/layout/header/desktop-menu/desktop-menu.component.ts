import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "app-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrls: ["./desktop-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopMenuComponent {
  @Input() apiStatus!: ApiStatus;
  @Input() isDarkMode!: boolean;

  @Output() toggleTheme = new EventEmitter<void>();
  @Output() openApiStatusDialog = new EventEmitter<void>();

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onOpenApiStatusDialog() {
    this.openApiStatusDialog.emit();
  }
}

