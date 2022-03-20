import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Watch } from '../../models/watch.model';
import { ScraperCardComponent } from '../scraper-card/scraper-card.component';

@Component({
  selector: 'app-delete-watch-dialog',
  templateUrl: './delete-watch-dialog.component.html',
  styleUrls: ['./delete-watch-dialog.component.scss'],
})
export class DeleteWatchDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public watchToDelete: Watch,
    public dialogRef: MatDialogRef<ScraperCardComponent>
  ) {}

  deleteWatch(watchToDelete: Watch) {
    this.dialogRef.close(watchToDelete);
  }
}
