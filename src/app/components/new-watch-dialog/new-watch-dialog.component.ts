import { Subject, takeUntil } from 'rxjs';

import { Component, OnDestroy } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
export class NewWatchDialogComponent implements OnDestroy {
  protected watchForm: FormGroup;
  private destroySubject$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<ScraperCardComponent>,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private progressBarService: ProgressBarOverlayService,
    private formBuilder: NonNullableFormBuilder
  ) {
    this.watchForm = this.formBuilder.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      link: ['', [Validators.required]],
    });
  }

  submitNewWatch() {
    const wordsSeparatedByPlus = this.watchForm
      .get('link')
      ?.value.trim()
      .replace(/\s+/g, '+');

    const replaceThreadString =
      'https://klocksnack.se/search/1/?q=REPLACE-ME&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date';

    const watchThread = replaceThreadString.replace(
      'REPLACE-ME',
      wordsSeparatedByPlus
    );

    const watchForm = {
      label: this.watchForm.get('label')?.value,
      link: watchThread,
    };

    this.watchService
      .addNewWatch(watchForm)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (res: Watch) => {
          this.dialogRef.close(res);
          this.snackbarService.successSnackbar(
            `Added watch with label: ${res.label}`
          );
          this.progressBarService.hide();
        },
        error: () => {
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
