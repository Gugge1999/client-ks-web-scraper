import { Subject, takeUntil } from 'rxjs';

import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { WatchFormDTO } from '@app/models/DTOs/watch-form-dto';
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
export class NewWatchDialogComponent implements OnDestroy {
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

  private destroySubject$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<ScraperCardComponent>,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private progressBarService: ProgressBarOverlayService
  ) {}

  submitNewWatch() {
    const wordsSeparatedByPlus = this.watchForm.controls.watchToScrape.value
      .trim()
      .replace(/\s+/g, '+');

    const replaceThreadString =
      'https://klocksnack.se/search/1/?q=REPLACE-ME&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date';

    const linkToThread = replaceThreadString.replace(
      'REPLACE-ME',
      wordsSeparatedByPlus
    );

    const watchFormDTO: WatchFormDTO = {
      label: this.watchForm.controls.label.value,
      linkToThread: linkToThread,
    };

    this.watchService
      .addNewWatch(watchFormDTO)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (res: Watch) => {
          this.dialogRef.close(res);
          this.snackbarService.successSnackbar(
            `Added watch with label: ${res.label}`
          );
          this.progressBarService.hide();
        },
        error: (error) => {
          console.log(`Error from addNewWatch function: ${error}`);
          this.dialogRef.close();
          this.progressBarService.hide();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
