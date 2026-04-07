import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { Theme, ThemeService } from "@services/theme.service";
import {
  TuiDataListComponent,
  TuiDialogService,
  TuiDropdownDirective,
  TuiDropdownOpen,
  TuiDropdownOptionsDirective,
  TuiHint,
  TuiIcon,
  TuiLoader,
  TuiOptGroup,
  TuiOption,
} from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { ApiStatus } from "@models/api-status.model";
import { UserService } from "@services/user.service";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { ApiStatusDialogComponent } from "@components/api-status-dialog/api-status-dialog.component";
import { AlertService } from "@services/alert.service";
import { lastValueFrom } from "rxjs";
import { ApiError } from "@models/DTOs/api-error.dto";
import { STACK_API_ERROR_OBJECT_PROPERTY } from "@constants/constants";
import { ChangePasswordDialogComponent } from "@components/change-password-dialog/change-password-dialog.component";
import { ResetPasswordComponent } from "@components/reset-password/reset-password.component";
import { UserFormDialogComponent } from "@components/user-form-dialog/user-form-dialog.component";
import { BreakpointObserverService } from "@services/breakpoint-observer.service";

@Component({
  selector: "scraper-header",
  imports: [
    TuiAppBar,
    TuiHint,
    TuiIcon,
    TuiLoader,
    TuiOptGroup,
    TuiDataListComponent,
    TuiDropdownOpen,
    TuiDropdownDirective,
    TuiOption,
    TuiDropdownOptionsDirective,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly apiStatus = input.required<ApiStatus>();

  private readonly themeService = inject(ThemeService);
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);
  private readonly dialogService = inject(TuiDialogService);
  private readonly breakpointObserverService = inject(BreakpointObserverService);
  private readonly appearanceDialogString = this.breakpointObserverService.appearanceDialogString;

  private readonly isDarkMode = this.themeService.isDarkMode;
  readonly themeIcon = computed(() => (this.isDarkMode() ? "moon" : "sun"));
  protected open = false;

  openApiStatusDialog() {
    this.dialogService
      .open(new PolymorpheusComponent(ApiStatusDialogComponent), {
        label: "Status för API",
        appearance: this.appearanceDialogString(),
        data: this.apiStatus,
      })
      .subscribe();
  }

  toggleTheme(): void {
    const newTheme: Theme = this.isDarkMode() ? "light" : "dark";

    return this.themeService.updateTheme(newTheme);
  }

  handleUserLogin() {
    this.dialogService.open(new PolymorpheusComponent(UserFormDialogComponent)).subscribe();
  }

  handleChangePassword() {
    this.dialogService.open(new PolymorpheusComponent(ChangePasswordDialogComponent)).subscribe();
  }

  handleResetPassword() {
    this.dialogService.open(new PolymorpheusComponent(ResetPasswordComponent)).subscribe();
  }

  handleLogout() {
    this.userService.logout();
  }

  async handleDeleteUser() {
    this.open = false;

    // TODO: Fixa riktiga id
    const apiRes = await lastValueFrom(this.userService.deleteUser("9f348bbf-c703-43a9-912a-793cfc3e560f")).catch(
      (err: ApiError) => err,
    );

    if (STACK_API_ERROR_OBJECT_PROPERTY in apiRes) {
      this.alertService.errorAlert(apiRes.message);
      return;
    }

    this.alertService.successAlert("Användare raderad");
  }
}
