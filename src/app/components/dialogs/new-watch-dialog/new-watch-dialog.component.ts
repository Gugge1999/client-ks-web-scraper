import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Store } from "@ngrx/store";

import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { addWatch } from "@store/actions/watch-api.actions";

@Component({
  selector: "ks-scraper-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./new-watch-dialog.component.scss",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
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

  protected submitNewWatch() {
    const newWatch: NewWatchFormDTO = {
      label: this.watchForm.controls.label.value,
      watchToScrape: this.watchForm.controls.watchToScrape.value,
    };

    this.store.dispatch(addWatch({ newWatch }));
  }

  protected onClear(formControl: FormControl) {
    formControl.patchValue("");
  }
}
