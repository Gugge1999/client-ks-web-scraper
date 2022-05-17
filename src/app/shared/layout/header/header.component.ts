import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  apiStatus!: ApiStatus;
  isDarkMode: boolean = true;
  showHamburgerMenu: boolean = true;

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
    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        state.matches
          ? (this.showHamburgerMenu = false)
          : (this.showHamburgerMenu = true);
      });
    this.statusService.getApiStatus().subscribe((res) => {
      this.apiStatus = res;
    });
  }

  openApiStatusDialog() {
    this.statusService.getApiStatus().subscribe((res) => {
      this.apiStatus = res;
    });

    this.dialog.open(ApiStatusDialogComponent, {
      width: '450px',
      data: this.apiStatus,
    });
  }

  toggleTheme() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode
      ? this.themeService.updateTheme('light-mode')
      : this.themeService.updateTheme('dark-mode');
  }
}
