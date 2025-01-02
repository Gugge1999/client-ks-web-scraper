import { Component, computed, inject, input } from "@angular/core";
import { ApiStatusDialogComponent } from "@components/api-status-dialog/api-status-dialog.component";
import { Theme, ThemeService } from "@services/theme.service";
import { tuiDialog, TuiHint, TuiIcon } from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { ApiStatus } from "@models/api-status.model";
import { UserFormDialogComponent } from "@components/user-form-dialog/user-form-dialog.component";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [TuiAppBar, TuiHint, TuiIcon],
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly statusDialog = tuiDialog(ApiStatusDialogComponent, {
    label: "Status för API",
    size: "m",
  });
  private readonly newUserDialog = tuiDialog(UserFormDialogComponent, {
    size: "s",
  });

  private readonly isDarkMode = this.themeService.isDarkMode;
  readonly themeIcon = computed(() => (this.isDarkMode() ? "moon" : "sun"));
  readonly apiStatus = input.required<ApiStatus>();

  openApiStatusDialog() {
    this.statusDialog(this.apiStatus).subscribe();
  }

  toggleTheme(): void {
    const newTheme: Theme = this.isDarkMode() ? "light" : "dark";

    return this.themeService.updateTheme(newTheme);
  }

  handleUserClick() {
    this.newUserDialog().subscribe();
  }
}
