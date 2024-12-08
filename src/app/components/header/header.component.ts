import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { Theme, ThemeService } from "@services/theme.service";
import { tuiDialog, TuiHint, TuiIcon } from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { ApiStatus } from "@models/api-status.model";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  imports: [TuiAppBar, TuiHint, TuiIcon],
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly dialog = tuiDialog(ApiStatusDialogComponent, { label: "Status för API", size: "auto" });

  apiStatus = input.required<ApiStatus>();
  isDarkMode = this.themeService.isDarkMode;
  themeIcon = computed(() => (this.isDarkMode() ? "moon" : "sun"));

  openApiStatusDialog() {
    this.dialog(this.apiStatus).subscribe();
  }

  toggleTheme(): void {
    const newTheme: Theme = this.isDarkMode() ? "light" : "dark";

    return this.themeService.updateTheme(newTheme);
  }
}
