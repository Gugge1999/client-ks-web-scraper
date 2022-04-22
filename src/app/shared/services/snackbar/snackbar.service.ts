import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Watch } from '@models/watch.model';
import { WatchService } from '@services/watch.service';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private snackbar: MatSnackBar,
    private watchService: WatchService
  ) {}

  successSnackbar(message: string = '') {
    this.snackbar.open(message, 'Dismiss', {
      panelClass: 'success-snackbar',
    });
  }

  errorSnackbar(message: string = 'Something went wrong') {
    this.snackbar.open(`Error: ${message}`, 'Dismiss', {
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }

  undoAndDeleteSnackbar(deletedWatch: Watch, watches: Watch[]) {
    const snack = this.snackbar.open(
      `Deleted watch: ${deletedWatch.label}`,
      'Undo',
      {
        panelClass: ['mat-toolbar', 'mat-warn'],
      }
    );
    snack.afterDismissed().subscribe((res) => {
      // Om dismissedByAction är sant (användren klickade på Undo) ska vi inte ta bort klockan
      if (res.dismissedByAction === true) return;

      this.watchService.deleteWatch(deletedWatch.id).subscribe((res) => {
        console.log(`Deleted: ${res.deletedWatchId}`);
      });
    });
    snack.onAction().subscribe(() => {
      // Den lägger till borttagna klockan längst ned. Inte alltid på samma index som den var på förut
      watches.push(deletedWatch);
    });
  }
}
