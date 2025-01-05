import { Component, computed, inject, input } from "@angular/core";
import { ApiStatusDialogComponent } from "@components/api-status-dialog/api-status-dialog.component";
import { Theme, ThemeService } from "@services/theme.service";
import { TuiDataList, tuiDialog, TuiDropdown, TuiDropdownDirective, TuiHint, TuiIcon } from "@taiga-ui/core";
import { TuiAppBar } from "@taiga-ui/layout";
import { ApiStatus } from "@models/api-status.model";
import { UserFormDialogComponent } from "@components/user-form-dialog/user-form-dialog.component";
import { UserService } from "@services/user.service";
import { ChangePasswordDialogComponent } from "@components/change-password-dialog/change-password-dialog.component";
import { ResetPasswordComponent } from "@components/reset-password/reset-password.component";
import { lastValueFrom } from "rxjs";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { AlertService } from "@services/alert.service";
import { ApiError } from "@models/DTOs/api-error.dto";

@Component({
  selector: "scraper-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [TuiAppBar, TuiHint, TuiIcon, TuiDataList, TuiDropdown, TuiDropdownDirective],
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);
  private readonly statusDialog = tuiDialog(ApiStatusDialogComponent, { label: "Status för API", size: "m" });
  private readonly userFormDialog = tuiDialog(UserFormDialogComponent, { size: "s" });
  private readonly changePasswordFormDialog = tuiDialog(ChangePasswordDialogComponent, { size: "s" });
  private readonly resetPasswordFormDialog = tuiDialog(ResetPasswordComponent, { size: "s" });

  private readonly isDarkMode = this.themeService.isDarkMode;
  readonly themeIcon = computed(() => (this.isDarkMode() ? "moon" : "sun"));
  readonly apiStatus = input.required<ApiStatus>();
  protected open = false;

  openApiStatusDialog() {
    this.statusDialog(this.apiStatus).subscribe();
  }

  toggleTheme(): void {
    const newTheme: Theme = this.isDarkMode() ? "light" : "dark";

    return this.themeService.updateTheme(newTheme);
  }

  handleUserLogin() {
    this.userFormDialog().subscribe();
  }

  handleChangePassword() {
    this.changePasswordFormDialog().subscribe();
  }

  handleResetPassword() {
    this.resetPasswordFormDialog().subscribe();
  }

  // TODO: Fixa
  handleLogout() {
    this.userService.logout();
  }

  async handleDeleteUser() {
    this.open = false;

    // TODO: Fixa riktiga id
    const apiRes = await lastValueFrom(this.userService.deleteUser("9f348bbf-c703-43a9-912a-793cfc3e560f")).catch(
      (err: ApiError) => err,
    );

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      this.alertService.errorAlert(apiRes.message);
      return;
    }

    this.alertService.successAlert("Användare raderad");
  }
}
