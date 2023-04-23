import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Store } from "@ngrx/store";
import { addWatch } from "@store/actions/watch-api.actions";

@Component({
  selector: "app-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./new-watch-dialog.component.scss"],
})
export class NewWatchDialogComponent {
  watchForm = new FormGroup({
    label: new FormControl<string>("", {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    watchToScrape: new FormControl<string>("", {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private store: Store) {}

  submitNewWatch() {
    const newWatch: NewWatchFormDTO = {
      label: this.watchForm.controls.label.value,
      watchToScrape: this.watchForm.controls.watchToScrape.value,
    };

    this.store.dispatch(addWatch({ newWatch }));
  }
}
