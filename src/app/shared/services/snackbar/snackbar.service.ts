import { Subject, takeUntil } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Watch } from '@models/watch.model';
import { WatchService } from '@services/watch.service';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService implements OnDestroy {
  private destroySubject$ = new Subject<void>();

  constructor(
    private snackbar: MatSnackBar,
    private watchService: WatchService
  ) {}

  successSnackbar(message: string = '') {
    this.snackbar.open(message, 'Dismiss', {
      panelClass: 'snackbar-success',
    });
  }

  infoSnackbar(message: string = '') {
    this.snackbar.open(message, 'Dismiss', {
      panelClass: 'snackbar-info',
    });
  }

  errorSnackbar(message: string = 'Something went wrong') {
    this.snackbar.open(`Error: ${message}`, 'Dismiss', {
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }

  undoAndDeleteSnackbar(deletedWatch: Watch, index: number, watches: Watch[]) {
    const snack = this.snackbar.open(
      `Deleted watch: ${deletedWatch.label}`,
      'Undo',
      {
        panelClass: ['mat-toolbar', 'mat-warn'],
      }
    );
    snack
      .afterDismissed()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res) => {
        // Om dismissedByAction är sant (användaren klickade på Undo) ska vi inte ta bort klockan
        if (res.dismissedByAction === true) return;

        // Byt till switchMap?
        this.watchService
          .deleteWatch(deletedWatch.id)
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((res) => {
            console.log(`Deleted: ${res.deletedWatchId}`);
          });
      });
    snack
      .onAction()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(() => {
        watches.splice(index, 0, deletedWatch);
      });
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
