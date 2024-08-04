import { FormControl } from "@angular/forms";

export interface WatchForm {
  label: FormControl<string>;
  watchToScrape: FormControl<string>;
}
