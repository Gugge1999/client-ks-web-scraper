import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { MatDialog } from "@angular/material/dialog";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { DesktopMenuComponent } from "@components/header/desktop-menu/desktop-menu.component";
import { MobileMenuComponent } from "@components/header/mobile-menu/mobile-menu.component";
import { Theme, initialApiStatus } from "@models/constants";
import { StatusService } from "@services/status.service";
import { ThemeService } from "@services/theme.service";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MobileMenuComponent, DesktopMenuComponent],
})
export class HeaderComponent implements OnInit {
  isDarkMode = signal(false);
  isHandset = toSignal(this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((bs) => bs.matches)), { initialValue: false });
  apiStatus = toSignal(timer(0, 30_000).pipe(switchMap(() => this.statusService.getApiStatus())), {
    initialValue: initialApiStatus,
  });

  constructor(
    private readonly statusService: StatusService,
    private readonly themeService: ThemeService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode.set(this.themeService.isDarkMode());
  }

  openApiStatusDialog() {
    this.dialog.open(ApiStatusDialogComponent, {
      width: "450px",
      restoreFocus: false,
    });
  }

  toggleTheme() {
    this.themeService.isDarkMode() ? this.themeService.updateTheme(Theme.lightMode) : this.themeService.updateTheme(Theme.darkMode);

    this.isDarkMode.set(this.themeService.isDarkMode());
  }
}
