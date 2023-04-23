import { catchError, filter, Observable, of, shareReplay, switchMap, timer } from "rxjs";

import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { Theme } from "@models/constants";
import { Store } from "@ngrx/store";
import { StatusService } from "@shared/services/utils/status.service";
import { ThemeService } from "@shared/services/utils/theme.service";
import { openApiStatusDialog } from "@store/actions/dialog.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  apiStatus$!: Observable<ApiStatus>;
  isDarkMode: boolean;
  showHamburgerMenu: boolean = true;
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

    let failedApiCalls = 0;

    // TODO: Byt till retry?
    this.apiStatus$ = timer(0, 30000).pipe(
      filter(() => failedApiCalls !== 3),
      switchMap(() =>
        this.statusService.getApiStatus().pipe(
          catchError(() => {
            failedApiCalls++;

            const errorApiStatus: ApiStatus = {
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

            return of(errorApiStatus);
          })
        )
      ),
      // TODO: Jag tror att shareReplay går att ta bort om apiStatus$ alltid är truthy
      shareReplay({ bufferSize: 1, refCount: true }) // OBS: ShareReplay måste ligga sist i pipe
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
}
