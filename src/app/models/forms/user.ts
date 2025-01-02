import { FormControl } from "@angular/forms";

export interface NewUserForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
