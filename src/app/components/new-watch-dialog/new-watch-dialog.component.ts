import { Component } from '@angular/core';
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
  newWatch = <Watch>{};
  urlPattern: string =
    '[https://]?(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';

  constructor(
    private dialogRef: MatDialogRef<ScraperCardComponent>,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private progressBarService: ProgressBarOverlayService
  ) {}

  onSubmit() {
    if (this.newWatch.link.substring(0, 8) !== 'https://') {
      this.newWatch.link = `https://${this.newWatch.link}`;
    }

    // Byt ut id för sökningen som KS lägger på med 1.
    // Det löser problemet med att "för nya" länkar har gammal data.
    // När ett gammalt id skickas med tar den alltid de nyaste.
    const splitLink = this.newWatch.link.split('/');

    splitLink[4] = '1';

    this.newWatch.link = splitLink.join('/');

    this.watchService.addNewWatch(this.newWatch).subscribe({
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
