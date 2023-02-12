import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScraperCardComponent } from '@components/scraper-card/scraper-card.component';
import { NewWatchFormDTO } from '@models/DTOs/new-watch-form-dto';
import { Store } from '@ngrx/store';
import { addWatch } from '@store/actions/watch-api.actions';

@Component({
  selector: 'app-new-watch-dialog',
  templateUrl: './new-watch-dialog.component.html',
  styleUrls: ['./new-watch-dialog.component.scss'],
})
export class NewWatchDialogComponent {
  watchForm = new FormGroup({
    label: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    watchToScrape: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<ScraperCardComponent>,
    private readonly store: Store
  ) {}

  submitNewWatch() {
    const watchFormDTO: NewWatchFormDTO = {
      label: this.watchForm.controls.label.value,
      watchToScrape: this.watchForm.controls.watchToScrape.value,
    };

    this.store.dispatch(
      addWatch({ newWatch: watchFormDTO, dialogRef: this.dialogRef })
    );
  }
}
