import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WatchService } from '../../services/watch.service';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-delete-watch-dialog',
  templateUrl: './delete-watch-dialog.component.html',
  styleUrls: ['./delete-watch-dialog.component.scss'],
})
export class DeleteWatchDialogComponent {
  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private watchService: WatchService,
    public dialogRef: MatDialogRef<MainNavComponent>
  ) {}

  deleteWatch(watchToDelete: any): void {
    this.watchService.deleteWatch(watchToDelete.id).subscribe((response) => {
      // För bättre Undo
      // https://stackblitz.com/edit/undo-snackbar
      // Lägg till laddsnurra eller progess bar

      this.showSnackbar(watchToDelete.label, 'Undo');
      this.dialogRef.close(response);
    });
  }

  showSnackbar(message: string, action: string): void {
    let snack = this.snackbar.open(`Deleted watch: ${message}`, action, {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }
}
