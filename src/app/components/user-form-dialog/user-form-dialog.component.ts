import { Component, inject, signal } from "@angular/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { UserForm } from "@models/forms/user";
import { UserService } from "@services/user.service";
import { User } from "@models/user";
import { lastValueFrom } from "rxjs";
import { ApiError } from "@models/DTOs/api-error.dto";
import { UserFormDto } from "@models/DTOs/user";

@Component({
  selector: "scraper-new-user-form-dialog",
  templateUrl: "./user-form-dialog.component.html",
  imports: [FormsModule, ReactiveFormsModule, TuiError, TuiFieldErrorPipe, AsyncPipe, TuiButton, TuiButtonLoading, TuiTextfield],
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      email: "Ange en giltig e-postadress",
      usernameExists: "Användarnamnet finns redan",
      emailExists: "Email finns redan registrerad",
      // OBS: Variabel måste heta requiredLength
      minlength: ({ requiredLength }: { requiredLength: string }) => `Minst ${requiredLength} tecken`,
    }),
  ],
})
export class UserFormDialogComponent {
  public readonly context = injectContext<TuiDialogContext<User | undefined, void>>();
  private readonly userService = inject(UserService);

  protected readonly headerText = signal("Logga in");
  protected readonly buttonText = signal("Logga in");
  protected readonly createUserLoading = signal(false);
  protected readonly newUser = signal(true);

  // OBS! FormControl för email sätts dynamiskt beroende på om användare väljer logga in eller registrera
  userForm = new FormGroup<UserForm>({
    username: new FormControl("", {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  loginUser() {
    this.headerText.set("Logga in");
    this.buttonText.set("Logga in");
    this.newUser.set(true);
    this.userForm.removeControl("email");
  }

  registerUser() {
    this.headerText.set("Skapa ny användare");
    this.buttonText.set("Skapa användare");
    this.newUser.set(false);

    this.userForm.addControl(
      "email",
      new FormControl("", {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
    );
  }

  protected async submitNewUser() {
    this.createUserLoading.set(true);

    const newUserDto: UserFormDto = {
      username: this.userForm.getRawValue().username,
      email: this.userForm.getRawValue().email,
      password: this.userForm.getRawValue().password,
    };

    const apiRes = await lastValueFrom(this.userService.registerNewUser(newUserDto)).catch((err: ApiError) => err);

    this.createUserLoading.set(false);

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      // TODO: Det kanske finns ett bättre sätt att göra detta på
      if (apiRes.message.toLowerCase().includes("användare med användarnamn")) {
        this.userForm.controls.username.setErrors({ usernameExists: true });
        return;
      }

      this.userForm.controls.email?.setErrors({ emailExists: true });
      return;
    }

    this.context.completeWith(apiRes);
  }

  cancelClicked() {
    this.context.completeWith(undefined);
  }
}
