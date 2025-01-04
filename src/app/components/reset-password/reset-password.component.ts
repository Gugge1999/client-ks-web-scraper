import { Component, inject, signal } from "@angular/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { injectContext } from "@taiga-ui/polymorpheus";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { User } from "@models/user";
import { UserService } from "@services/user.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ResetPasswordForm } from "@models/forms/user";
import { AsyncPipe } from "@angular/common";
import { ResetPasswordDto } from "@models/DTOs/user";
import { lastValueFrom } from "rxjs";
import { ApiError } from "@models/DTOs/api-error.dto";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";

@Component({
  selector: "scraper-reset-password",
  imports: [ReactiveFormsModule, TuiTextfield, TuiError, AsyncPipe, TuiFieldErrorPipe, TuiButtonLoading, TuiButton],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      email: "Ange en giltig e-postadress",
      emailDoesNotExist: "Email finns inte registrerad",
    }),
  ],
})
export class ResetPasswordComponent {
  public readonly context = injectContext<TuiDialogContext<User | undefined, void>>();
  private readonly userService = inject(UserService);

  readonly resetPasswordLoading = signal(false);

  resetPasswordForm = new FormGroup<ResetPasswordForm>({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  cancelClicked() {
    this.context.completeWith(undefined);
  }

  protected async submitResetPassword() {
    this.resetPasswordLoading.set(true);

    const resetPasswordDto: ResetPasswordDto = {
      email: this.resetPasswordForm.getRawValue().email,
    };

    const apiRes = await lastValueFrom(this.userService.resetPassword(resetPasswordDto)).catch((err: ApiError) => err);

    this.resetPasswordLoading.set(false);

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      this.resetPasswordForm.controls.email?.setErrors({ emailDoesNotExist: true });
      return;
    }

    this.context.completeWith(apiRes);
  }
}
