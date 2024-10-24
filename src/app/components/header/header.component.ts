import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { initialApiStatus } from "@constants/constants";
import { StatusService } from "@services/status.service";
import { ThemeService } from "@services/theme.service";
import { TuiPlatform } from "@taiga-ui/cdk/directives/platform";
import { TuiButton, TuiTitle } from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, TuiAppBar, TuiButton, TuiPlatform, TuiTitle],
})
export class HeaderComponent {
  private readonly statusService = inject(StatusService);
  private readonly themeService = inject(ThemeService);
  private readonly dialog = inject(MatDialog);

  isDarkMode = this.themeService.isDarkMode;

  apiStatus = toSignal(timer(0, 30_000).pipe(switchMap(() => this.statusService.getApiStatus())), {
    initialValue: initialApiStatus,
  });

  openApiStatusDialog() {
    this.dialog.open(ApiStatusDialogComponent, { width: "450px", restoreFocus: false });
  }

  toggleTheme(): void {
    return this.isDarkMode() ? this.themeService.updateTheme("light") : this.themeService.updateTheme("dark");
  }
}
