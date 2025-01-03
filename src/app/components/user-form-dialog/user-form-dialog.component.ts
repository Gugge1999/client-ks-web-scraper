import { Component, inject, OnInit, signal } from "@angular/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { UserForm } from "@models/forms/user";
import { NewUserDto } from "@models/DTOs/user";
import { UserService } from "@services/user.service";
import { User } from "@models/user";
import { lastValueFrom } from "rxjs";
import { ApiError } from "@models/DTOs/api-error.dto";

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
export class UserFormDialogComponent implements OnInit {
  public readonly context = injectContext<TuiDialogContext<User | undefined, { newUser: boolean }>>();
  private readonly userService = inject(UserService);
  protected readonly headerText = signal("");
  protected readonly buttonText = signal("");

  // OBS! FormControl för email sätts dynamiskt i ngOnInit
  userForm = new FormGroup<UserForm>({
    username: new FormControl("", {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    if (this.context.data.newUser) {
      this.headerText.set("Skapa ny användare");
      this.buttonText.set("Skapa användare");

      this.userForm.addControl(
        "email",
        new FormControl("", {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
      );
    } else {
      this.headerText.set("Logga in");
      this.buttonText.set("Logga in");
    }
  }

  readonly createUserLoading = signal(false);

  protected async submitNewUser() {
    this.createUserLoading.set(true);

    const newUserDto: NewUserDto = {
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
