import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { initialApiStatus } from "@constants/constants";
import { StatusService } from "@services/status.service";
import { ThemeService } from "@services/theme.service";
import { TuiPlatform } from "@taiga-ui/cdk/directives/platform";
import { TuiButton, tuiDialog, TuiHint, TuiIcon, TuiTitle } from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  standalone: true,
  imports: [TuiAppBar, TuiButton, TuiPlatform, TuiTitle, TuiHint, TuiIcon],
})
export class HeaderComponent {
  private readonly statusService = inject(StatusService);
  private readonly themeService = inject(ThemeService);
  private readonly dialog = tuiDialog(ApiStatusDialogComponent, {
    size: "auto",
    label: "Status för API",
    closeable: false,
  });

  apiStatus = toSignal(timer(0, 30_000).pipe(switchMap(() => this.statusService.getApiStatus())), {
    initialValue: initialApiStatus,
  });

  isDarkMode = this.themeService.isDarkMode;

  openApiStatusDialog() {
    this.dialog(this.apiStatus()).subscribe();
  }

  toggleTheme(): void {
    return this.isDarkMode() ? this.themeService.updateTheme("light") : this.themeService.updateTheme("dark");
  }
}
