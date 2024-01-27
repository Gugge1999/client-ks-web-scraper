import { timer } from "rxjs";
import { retry, startWith, switchMap } from "rxjs/operators";

import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { ApiStatus } from "@models/api-status.model";
import { Theme } from "@models/constants";
import { Store } from "@ngrx/store";
import { DesktopMenuComponent } from "@shared/layout/header/desktop-menu/desktop-menu.component";
import { MobileMenuComponent } from "@shared/layout/header/mobile-menu/mobile-menu.component";
import { StatusService } from "@shared/services/utils/status.service";
import { ThemeService } from "@shared/services/utils/theme.service";
import { openApiStatusDialog } from "@store/actions/dialog.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./header.component.scss",
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatIconModule, MobileMenuComponent, DesktopMenuComponent],
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean;
  isHandset = signal(false);
  apiStatus = signal(this.initialApiStatus());

  constructor(
    private statusService: StatusService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
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

    this.isDarkMode = this.themeService.isDarkMode();
  }

  private initialApiStatus(): ApiStatus {
    return {
      active: false,
      scrapingIntervalInMinutes: 1,
      uptime: {
        years: 1,
        months: 1,
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
      },
    };
  }
}
