import { FormControl } from "@angular/forms";

export interface UserForm {
  username: FormControl<string>;
  email?: FormControl<string>;
  password: FormControl<string>;
}
