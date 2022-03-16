import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NewWatch } from '../../models/new-watch';
import { WatchService } from '../../services/watch.service';
import { ScraperCardComponent } from '../scraper-card/scraper-card.component';

@Component({
  selector: 'app-new-watch-dialog',
  templateUrl: './new-watch-dialog.component.html',
  styleUrls: ['./new-watch-dialog.component.scss'],
})
export class NewWatchDialogComponent {
  newWatch = new NewWatch('', '');

  urlPattern: string =
    'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';

  constructor(
    public dialogRef: MatDialogRef<ScraperCardComponent>,
    private snackbar: MatSnackBar,
    private watchService: WatchService
  ) {}

  onSubmit() {
    this.watchService.addNewWatch(this.newWatch).subscribe((res: any) => {
      this.showSnackbarAdd(res.label);
      this.dialogRef.close(res);
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
}
