import { Component, computed, inject, input } from "@angular/core";
import { ApiStatusDialogComponent } from "@components/api-status-dialog/api-status-dialog.component";
import { Theme, ThemeService } from "@services/theme.service";
import { TuiDataList, tuiDialog, TuiDropdown, TuiDropdownDirective, TuiHint, TuiIcon } from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { ApiStatus } from "@models/api-status.model";
import { UserFormDialogComponent } from "@components/user-form-dialog/user-form-dialog.component";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [TuiAppBar, TuiHint, TuiIcon, TuiDataList, TuiDropdown, TuiDropdownDirective, NgForOf, NgIf],
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly statusDialog = tuiDialog(ApiStatusDialogComponent, {
    label: "Status för API",
    size: "m",
  });
  private readonly newUserDialog = tuiDialog(UserFormDialogComponent, {
    size: "s",
  });

  protected open = false;

  protected readonly items = [
    ["By interest", "By genre", "By release year", "By subject"],
    ["Ascending", "Descending"],
  ];

  protected primary = "By genre";

  protected ascending = false;

  protected onClick(item: string): void {
    if (this.items[0]?.includes(item)) {
      this.primary = item;

      return;
    }

    this.ascending = item === this.items[1]?.[0];
  }

  protected itemIsActive(item: string): boolean {
    return (
      item === this.primary || (this.ascending && item === this.items[1]?.[0]) || (!this.ascending && item === this.items[1]?.[1])
    );
  }

  private readonly isDarkMode = this.themeService.isDarkMode;
  readonly themeIcon = computed(() => (this.isDarkMode() ? "moon" : "sun"));
  readonly apiStatus = input.required<ApiStatus>();

  openApiStatusDialog() {
    this.statusDialog(this.apiStatus).subscribe();
  }

  toggleTheme(): void {
    const newTheme: Theme = this.isDarkMode() ? "light" : "dark";

    return this.themeService.updateTheme(newTheme);
  }

  handleUserClick() {
    this.newUserDialog().subscribe();
  }
}
