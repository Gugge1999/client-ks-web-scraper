import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { ScraperCardComponent } from '@components/scraper-card/scraper-card.component';
import { Watch } from '@models/watch.model';

@Component({
  selector: 'app-delete-watch-dialog',
  templateUrl: './delete-watch-dialog.component.html',
  styleUrls: ['./delete-watch-dialog.component.scss'],
})
export class DeleteWatchDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public watchToDelete: Watch,
    private dialogRef: MatDialogRef<ScraperCardComponent>
  ) {}

  cancelClicked(): void {
    this.dialogRef.close({ click: 'cancelClicked' });
  }

  deleteWatch(watchToDelete: Watch): void {
    this.dialogRef.close(watchToDelete);
  }
}
