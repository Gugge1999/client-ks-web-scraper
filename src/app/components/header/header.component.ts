import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";

import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { Theme, initialApiStatus } from "@models/constants";
import { StatusService } from "@services/status.service";
import { ThemeService } from "@services/theme.service";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
})
export class HeaderComponent {
  private readonly statusService = inject(StatusService);
  private readonly themeService = inject(ThemeService);
  private readonly dialog = inject(MatDialog);

  isDarkMode = this.themeService.isDarkMode;
  apiStatus = toSignal(timer(0, 30_000).pipe(switchMap(() => this.statusService.getApiStatus())), {
    initialValue: initialApiStatus,
  });

  openApiStatusDialog(): void {
    this.dialog.open(ApiStatusDialogComponent, { width: "450px", restoreFocus: false });
  }

  toggleTheme = () => (this.isDarkMode() ? this.themeService.updateTheme(Theme.Light) : this.themeService.updateTheme(Theme.Dark));
}
