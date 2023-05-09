import { NgClass, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "app-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrls: ["./desktop-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, MatTooltipModule, MatSlideToggleModule, MatIconModule, NgIf],
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
