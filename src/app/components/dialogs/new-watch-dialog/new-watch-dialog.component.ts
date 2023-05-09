import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Store } from "@ngrx/store";
import { addWatch } from "@store/actions/watch-api.actions";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./new-watch-dialog.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
  ],
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
