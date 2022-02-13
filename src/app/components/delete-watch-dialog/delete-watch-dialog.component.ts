import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WatchService } from '../../services/watch.service';

@Component({
  selector: 'app-delete-watch-dialog',
  templateUrl: './delete-watch-dialog.component.html',
  styleUrls: ['./delete-watch-dialog.component.scss'],
})
export class DeleteWatchDialogComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private watchService: WatchService
  ) {}

  ngOnInit(): void {}

  deleteWatch(watchToDelete: any): void {
    this.watchService.deleteWatch(watchToDelete.id).subscribe(() => {
      // För bättre Undo
      // https://stackblitz.com/edit/undo-snackbar
      this.showSnackbar(watchToDelete.label, 'Undo');
    });
  }

  showSnackbar(message: string, action: string): void {
    let snack = this.snackbar.open(`Deleted watch ${message}`, action, {
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
