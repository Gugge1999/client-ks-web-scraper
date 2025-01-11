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
      emailExists: "Email finns redan registrerad",
      wrongPassword: "Fel lösenord",
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
  protected readonly newUser = signal(false);

  // OBS! FormControl för email sätts dynamiskt beroende på om användare väljer logga in eller registrera
  userForm = new FormGroup<UserForm>({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
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
    this.newUser.set(false);
  }

  registerUser() {
    this.headerText.set("Skapa ny användare");
    this.buttonText.set("Skapa användare");
    this.newUser.set(true);
  }

  protected async submitNewUser() {
    this.createUserLoading.set(true);

    const newUserDto: UserFormDto = {
      email: this.userForm.getRawValue().email,
      password: this.userForm.getRawValue().password,
    };

    const apiRes = this.newUser()
      ? await lastValueFrom(this.userService.registerNewUser(newUserDto)).catch((err: ApiError) => err)
      : await lastValueFrom(this.userService.login(newUserDto)).catch((err: ApiError) => err);

    this.createUserLoading.set(false);

    if (apiRes && STACK_API_ERROR_PROPERTY in apiRes) {
      if (apiRes.message.toLowerCase() === "fel lösenord") {
        this.userForm.controls.password?.setErrors({ wrongPassword: true });
        return;
      }

      // TODO: Här måste man nog också kolla om email inte möter kraven
      this.userForm.controls.email?.setErrors({ emailExists: true });
      return;
    }

    this.context.completeWith(apiRes);
  }
}
