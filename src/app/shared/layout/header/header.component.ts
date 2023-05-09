import { Observable, timer } from "rxjs";
import { retry, startWith, switchMap } from "rxjs/operators";

import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [NgIf, MatToolbarModule, RouterLink, MatIconModule, MobileMenuComponent, DesktopMenuComponent, AsyncPipe],
})
export class HeaderComponent implements OnInit {
  apiStatus$!: Observable<ApiStatus>;
  isDarkMode: boolean;
  showHamburgerMenu = true;
  isHandset$!: Observable<BreakpointState>;

  constructor(
    private statusService: StatusService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);

    this.apiStatus$ = timer(0, 10_000).pipe(
      switchMap(() => this.statusService.getApiStatus()),
      startWith(this.getInitialApiStatus()), // startWith måste ligga efter switchMap
      retry(3)
    );
  }

  openApiStatusDialog() {
    this.store.dispatch(openApiStatusDialog());
  }

  toggleTheme() {
    this.themeService.isDarkMode()
      ? this.themeService.updateTheme(Theme.lightMode)
      : this.themeService.updateTheme(Theme.darkMode);

    this.themeService.setCurrentTheme(this.themeService.isDarkMode() ? Theme.darkMode : Theme.lightMode);

    this.isDarkMode = this.themeService.isDarkMode();
  }

  private getInitialApiStatus(): ApiStatus {
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
