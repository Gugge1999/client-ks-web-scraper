import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { timer } from "rxjs";
import { map, retry, switchMap } from "rxjs/operators";

import { DesktopMenuComponent } from "@components/header/desktop-menu/desktop-menu.component";
import { MobileMenuComponent } from "@components/header/mobile-menu/mobile-menu.component";
import { ApiStatus } from "@models/api-status.model";
import { Theme } from "@models/constants";
import { Store } from "@ngrx/store";
import { StatusService } from "@services/status.service";
import { ThemeService } from "@services/theme.service";
import { openApiStatusDialog } from "@store/actions/dialog.actions";

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
  apiStatus = toSignal(
    timer(0, 30_000).pipe(
      switchMap(() => this.statusService.getApiStatus()),
      retry({ count: 2, delay: 5_000 }),
    ),
    { initialValue: this.initialApiStatus() },
  );

  constructor(
    private statusService: StatusService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode.set(this.themeService.isDarkMode());
  }

  openApiStatusDialog() {
    this.store.dispatch(openApiStatusDialog());
  }

  toggleTheme() {
    this.themeService.isDarkMode() ? this.themeService.updateTheme(Theme.lightMode) : this.themeService.updateTheme(Theme.darkMode);

    this.isDarkMode.set(this.themeService.isDarkMode());
  }

  private initialApiStatus(): ApiStatus {
    return {
      active: false,
      scrapingIntervalInMinutes: 0,
      uptime: {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  }
}
