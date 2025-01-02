import { Component, inject, signal } from "@angular/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { NewUserForm } from "@models/forms/user";
import { NewUserDto } from "@models/DTOs/user";
import { UserService } from "@services/user.service";
import { User } from "@models/User";
import { lastValueFrom } from "rxjs";
import { ApiError } from "@models/DTOs/api-error.dto";

@Component({
  selector: "scraper-new-user-dialog",
  templateUrl: "./login-dialog.component.html",
  imports: [FormsModule, ReactiveFormsModule, TuiError, TuiFieldErrorPipe, AsyncPipe, TuiButton, TuiButtonLoading, TuiTextfield],
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      email: "Ange en giltig e-postadress",
      emailExists: "Email finns registrerad. Välj en ny",
      // OBS: Variabel måste heta requiredLength
      minlength: ({ requiredLength }: { requiredLength: string }) => `Minst ${requiredLength} tecken`,
    }),
  ],
})
export class LoginDialogComponent {
  public readonly context = injectContext<TuiDialogContext<User | undefined, void>>();
  private readonly userService = inject(UserService);

  newUserForm = new FormGroup<NewUserForm>({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
  });

  readonly createUserLoading = signal(false);

  protected async submitNewUser() {
    this.createUserLoading.set(true);

    const newUserDto: NewUserDto = {
      email: this.newUserForm.getRawValue().email,
      password: this.newUserForm.getRawValue().password,
    };

    const apiRes = await lastValueFrom(this.userService.registerNewUser(newUserDto)).catch((err: ApiError) => err);

    this.createUserLoading.set(false);

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      this.newUserForm.controls.email.setErrors({ emailExists: true });

      return;
    }

    this.context.completeWith(apiRes);
  }

  cancelClicked() {
    this.context.completeWith(undefined);
  }
}
