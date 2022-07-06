import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScraperCardComponent } from '@components/scraper-card/scraper-card.component';
import { Watch } from '@models/watch.model';
import { WatchService } from '@services/watch.service';
import { ProgressBarOverlayService } from '@shared/services/progress-bar/progess-bar-overlay.service';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-new-watch-dialog',
  templateUrl: './new-watch-dialog.component.html',
  styleUrls: ['./new-watch-dialog.component.scss'],
})
export class NewWatchDialogComponent {
  watchForm = new FormGroup({
    label: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    link: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(
    private dialogRef: MatDialogRef<ScraperCardComponent>,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private progressBarService: ProgressBarOverlayService
  ) {}

  submitNewWatch() {
    const wordsSeparatedByPlus = this.watchForm
      .get('link')
      ?.value.trim()
      .replace(/\s+/g, '+');

    this.watchForm
      .get('link')
      ?.setValue(
        'https://klocksnack.se/search/1/?q=REPLACE-ME&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date'.replace(
          'REPLACE-ME',
          wordsSeparatedByPlus ?? ''
        )
      );

    this.watchService.addNewWatch(this.watchForm.value).subscribe({
      next: (res: Watch) => {
        this.dialogRef.close(res);
        this.snackbarService.successSnackbar(
          `Added watch with label: ${res.label}`
        );
      },
      error: () => {
        this.dialogRef.close();
        this.progressBarService.hide();
      },
      complete: () => {
        this.progressBarService.hide();
      },
    });
  }
}
