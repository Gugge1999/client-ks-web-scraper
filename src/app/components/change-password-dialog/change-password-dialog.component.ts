import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ChangePasswordForm } from "@models/forms/user";
import { AsyncPipe } from "@angular/common";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { ChangePasswordDto } from "@models/DTOs/user";
import { lastValueFrom } from "rxjs";
import { ApiError } from "@models/DTOs/api-error.dto";
import { UserService } from "@services/user.service";
import { injectContext } from "@taiga-ui/polymorpheus";
import { User } from "@models/user";
import { STACK_API_ERROR_OBJECT_PROPERTY } from "@constants/constants";

@Component({
  selector: "scraper-change-password-dialog",
  imports: [AsyncPipe, ReactiveFormsModule, TuiTextfield, TuiError, TuiButton, TuiButtonLoading, TuiFieldErrorPipe],
  templateUrl: "./change-password-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      notmatched: "Bekräftade lösenordet stämmer inte överens",
      // OBS: Variabel måste heta requiredLength
      minlength: ({ requiredLength }: { requiredLength: string }) => `Minst ${requiredLength} tecken`,
    }),
  ],
})
export class ChangePasswordDialogComponent {
  public readonly context = injectContext<TuiDialogContext<User | undefined, void>>();
  private readonly userService = inject(UserService);
  readonly changePasswordLoading = signal(false);

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.getRawValue().newPassword;
    const confirmPassword = control.getRawValue().confirmNewPassword;

    return password === confirmPassword ? null : { notmatched: true };
  };

  changePasswordForm = new FormGroup<ChangePasswordForm>(
    {
      currentPassword: new FormControl("", {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
      newPassword: new FormControl("", {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
      confirmNewPassword: new FormControl("", {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
    },
    { validators: this.passwordMatchingValidator },
  );

  protected async submitChangePassword() {
    this.changePasswordLoading.set(true);

    const newUserDto: ChangePasswordDto = {
      currentPassword: this.changePasswordForm.getRawValue().currentPassword,
      newPassword: this.changePasswordForm.getRawValue().newPassword,
      confirmNewPassword: this.changePasswordForm.getRawValue().confirmNewPassword,
    };

    const apiRes = await lastValueFrom(this.userService.changePassword(newUserDto)).catch((err: ApiError) => err);

    this.changePasswordLoading.set(false);

    // TODO: Här måste man också kolla om det gamla lösenordet är fel
    if (STACK_API_ERROR_OBJECT_PROPERTY in apiRes) {
      this.changePasswordForm.controls.newPassword?.setErrors({ minLength: true });
      this.changePasswordForm.controls.confirmNewPassword?.setErrors({ minLength: true });
      return;
    }

    this.context.completeWith(apiRes);
  }
}
