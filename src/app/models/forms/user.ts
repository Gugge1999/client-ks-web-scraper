import { FormControl } from "@angular/forms";

export interface UserForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface ChangePasswordForm {
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
}

export interface ResetPasswordForm {
  email: FormControl<string>;
}
