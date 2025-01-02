import { FormControl } from "@angular/forms";

export interface NewUserForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
