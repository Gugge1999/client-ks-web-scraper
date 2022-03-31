import { SnackbarService } from 'src/app/services/snackbar.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
    private watchService: WatchService,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    this.watchService.addNewWatch(this.newWatch).subscribe({
      next: (res: Watch) => {
        this.dialogRef.close(res);
        this.snackbarService.openSuccessSnackbar(
          `Added watch with label: ${res.label}`
        );
      },
      error: (res: HttpErrorResponse) => {
        this.dialogRef.close();
        this.snackbarService.openErrorSnackbar(res.error.message);
      },
    });
  }
}
