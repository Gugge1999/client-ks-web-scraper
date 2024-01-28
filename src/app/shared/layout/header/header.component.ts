import { timer } from "rxjs";
import { retry, startWith, switchMap } from "rxjs/operators";

import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ApiStatus } from "@models/api-status.model";
import { Theme } from "@models/constants";
import { Store } from "@ngrx/store";
import { DesktopMenuComponent } from "@shared/layout/header/desktop-menu/desktop-menu.component";
import { MobileMenuComponent } from "@shared/layout/header/mobile-menu/mobile-menu.component";
import { StatusService } from "@shared/services/utils/status.service";
import { ThemeService } from "@shared/services/utils/theme.service";
import { openApiStatusDialog } from "@store/actions/dialog.actions";

@Component({
  selector: "ks-scraper-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MobileMenuComponent, DesktopMenuComponent],
})
export class HeaderComponent implements OnInit {
  isDarkMode = signal(false);
  isHandset = signal(false);
  apiStatus = signal(this.initialApiStatus());

  constructor(
    private statusService: StatusService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDarkMode.set(this.themeService.isDarkMode());

    // TODO: unsubscribe?
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((breakpointObserver) => {
      this.isHandset.set(breakpointObserver.matches);
    });

    timer(0, 10_000)
      .pipe(
        switchMap(() => this.statusService.getApiStatus()),
        startWith(this.initialApiStatus()), // startWith måste ligga efter switchMap
        retry({ count: 3, delay: 2_000 }),
      )
      .subscribe((apiStatus) => this.apiStatus.set(apiStatus));
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
