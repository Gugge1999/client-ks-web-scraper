import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Watch } from '../../models/watch.model';
import { WatchService } from '../../services/watch.service';
import { ScraperCardComponent } from '../scraper-card/scraper-card.component';

@Component({
  selector: 'app-new-watch-dialog',
  templateUrl: './new-watch-dialog.component.html',
  styleUrls: ['./new-watch-dialog.component.scss'],
})
export class NewWatchDialogComponent {
  newWatch = <Watch>{};
  urlPattern: string =
    'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';

  constructor(
    public dialogRef: MatDialogRef<ScraperCardComponent>,
    private snackbar: MatSnackBar,
    private watchService: WatchService
  ) {}

  onSubmit() {
    this.watchService.addNewWatch(this.newWatch).subscribe({
      next: (res: Watch) => {
        this.dialogRef.close(res);
        this.showSnackbarAdd(res.label);
      },
      error: (res: HttpErrorResponse) => {
        this.dialogRef.close();
        this.showSnackbarDelete(res.error.message);
      },
    });
  }

  showSnackbarAdd(response: string) {
    const snack = this.snackbar.open(
      `Added watch with label: ${response}`,
      'Dismiss',
      {
        panelClass: 'success-snackbar',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    );
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }

  showSnackbarDelete(message: string) {
    this.snackbar.open(`Error: ${message}`, 'Dismiss', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
