import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { ApiError } from "@models/DTOs/api-error.dto";
import { UserFormDto } from "@models/DTOs/user";
import { UserForm } from "@models/forms/user";
import { User } from "@models/user";
import { UserService } from "@services/user.service";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { injectContext } from "@taiga-ui/polymorpheus";
import { lastValueFrom } from "rxjs";

@Component({
  selector: "scraper-new-user-form-dialog",
  imports: [FormsModule, ReactiveFormsModule, TuiError, TuiFieldErrorPipe, AsyncPipe, TuiButton, TuiButtonLoading, TuiTextfield],
  templateUrl: "./user-form-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  protected readonly isNewUser = signal(false);

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
    this.isNewUser.set(false);
  }

  registerUser() {
    this.headerText.set("Skapa ny användare");
    this.buttonText.set("Skapa användare");
    this.isNewUser.set(true);
  }

  protected async submitForm() {
    this.createUserLoading.set(true);

    const newUserDto: UserFormDto = {
      email: this.userForm.getRawValue().email,
      password: this.userForm.getRawValue().password,
    };

    const apiRes = this.isNewUser()
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
