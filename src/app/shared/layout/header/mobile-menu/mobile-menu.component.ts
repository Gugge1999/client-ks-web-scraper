import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./mobile-menu.component.scss"],
})
export class MobileMenuComponent {
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

