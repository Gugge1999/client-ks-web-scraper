import {
  catchError,
  filter,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  timer
} from 'rxjs';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiStatusDialogComponent } from '@components/api-status-dialog/api-status-dialog.component';
import { ApiStatus } from '@models/api-status.model';
import { StatusService } from '@shared/services/utils/status.service';
import { ThemeService } from '@shared/services/utils/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  apiStatus$!: Observable<ApiStatus>;
  isDarkMode: boolean;
  showHamburgerMenu: boolean = true;
  isHandset$!: Observable<BreakpointState>;

  private destroySubject$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private statusService: StatusService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);

    let failedApiCalls = 0;

    this.apiStatus$ = timer(0, 30000).pipe(
      filter(() => failedApiCalls !== 3),
      switchMap(() =>
        this.statusService.getApiStatus().pipe(
          catchError((err) => {
            failedApiCalls++;
            return of(err);
          })
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true }) // OBS: ShareReplay måste ligga sist i pipe
    );
  }

  openApiStatusDialog() {
    this.dialog.open(ApiStatusDialogComponent, {
      width: '450px',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  toggleTheme() {
    this.themeService.isDarkMode()
      ? this.themeService.updateTheme('light-mode')
      : this.themeService.updateTheme('dark-mode');

    this.themeService.setCurrentTheme(
      this.themeService.isDarkMode() ? 'dark-mode' : 'light-mode'
    );

    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
