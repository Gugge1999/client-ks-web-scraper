import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { ThemeService } from "@services/theme.service";
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
  apiStatus = input.required<ApiStatus>();

  private readonly themeService = inject(ThemeService);
  private readonly dialog = tuiDialog(ApiStatusDialogComponent, {
    size: "auto",
    label: "Status för API",
    closeable: false,
  });

  isDarkMode = this.themeService.isDarkMode;

  openApiStatusDialog() {
    this.dialog(this.apiStatus()).subscribe();
  }

  toggleTheme(): void {
    return this.isDarkMode() ? this.themeService.updateTheme("light") : this.themeService.updateTheme("dark");
  }
}
