import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./mobile-menu.component.scss"],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatTooltipModule, MatSlideToggleModule, NgIf],
})
export class MobileMenuComponent {
  @Input({ required: true }) apiStatus!: ApiStatus;
  @Input({ required: true }) isDarkMode!: boolean;

  @Output() toggleTheme = new EventEmitter<void>();
  @Output() openApiStatusDialog = new EventEmitter<void>();

  onToggleTheme() {
    this.toggleTheme.emit();
  }

  onOpenApiStatusDialog() {
    this.openApiStatusDialog.emit();
  }
}
